import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';
import { PaystackService } from '../shared/services/paystack.service';
import { ResendService } from '../shared/services/resend.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private paystackService: PaystackService,
    private resendService: ResendService,
    private productsService: ProductsService,
  ) {}

  async create(orderData: any): Promise<any> {
    // Validate stock
    for (const item of orderData.items) {
      const product = await this.productsService.findOne(item.product);
      if (product.stock < item.quantity) {
        throw new BadRequestException(`Insufficient stock for ${product.name}`);
      }
    }

    const order = new this.orderModel(orderData);

    // ─── PAYSTACK CARD PAYMENT ───────────────────────
    if (order.paymentMethod === 'PAYSTACK') {
      const payment = await this.paystackService.initializePayment(
        orderData.userEmail || orderData.shippingAddress.email,
        order.totalAmount,
        { orderId: order._id.toString() }
      );
      order.paymentReference = payment.data.reference;
      await order.save();
      return { order, payment };
    }

    // ─── BANK TRANSFER (Virtual Account) ─────────────
    if (order.paymentMethod === 'BANK_TRANSFER') {
      await order.save();

      try {
        const email = orderData.userEmail || orderData.shippingAddress.email || `guest_${order._id}@dobicakes.com`;
        const name = orderData.shippingAddress?.name || 'Dobi Cakes Customer';

        // Use Paystack transaction/initialize with bank_transfer channel
        // This generates a temporary virtual account for THIS specific transaction
        const bankTransfer = await this.paystackService.createTransferRecipient(
          name,
          email,
          order.totalAmount,
          { orderId: order._id.toString(), custom_fields: [{ display_name: 'Order ID', variable_name: 'order_id', value: order._id.toString() }] }
        );

        if (bankTransfer.status && bankTransfer.data) {
          order.paymentReference = bankTransfer.data.reference;
          order.virtualAccountRef = bankTransfer.data.access_code;

          // Store the authorization URL — the user will be redirected here
          // Paystack will show them the virtual account details
          await order.save();

          return {
            order,
            bankTransfer: {
              reference: bankTransfer.data.reference,
              accessCode: bankTransfer.data.access_code,
              authorizationUrl: bankTransfer.data.authorization_url,
            },
          };
        }
      } catch (err) {
        this.logger.error(`Bank transfer initialization failed: ${err?.response?.data?.message || err.message}`);
        // Fallback — save order and let admin handle manually
      }

      await order.save();
      return { order };
    }

    await order.save();
    return { order };
  }

  // ─── WEBHOOK HANDLER ────────────────────────────────
  async handleWebhook(event: string, data: any): Promise<void> {
    this.logger.log(`Webhook received: ${event}`);

    if (event === 'charge.success') {
      const reference = data.reference;
      const orderId = data.metadata?.orderId;

      if (!orderId && !reference) {
        this.logger.warn('Webhook charge.success without orderId or reference');
        return;
      }

      // Find order by reference or metadata orderId
      let order: OrderDocument | null = null;
      if (reference) {
        order = await this.orderModel.findOne({ paymentReference: reference });
      }
      if (!order && orderId) {
        order = await this.orderModel.findById(orderId);
      }

      if (!order) {
        this.logger.warn(`Webhook: Order not found for ref=${reference}, id=${orderId}`);
        return;
      }

      if (order.status === 'PROCESSING') {
        this.logger.log(`Order ${order._id} already marked as PAID`);
        return;
      }

      order.status = 'PROCESSING';
      order.paymentReference = reference;
      await order.save();

      this.logger.log(`Order ${order._id} marked PAID via webhook`);

      // Reduce stock
      for (const item of order.items) {
        await this.productsService.updateStock(item.product.toString(), -item.quantity);
      }

      // Send confirmation email
      await this.sendConfirmationEmail(order);
    }
  }

  // ─── CHECK PAYMENT STATUS (Polling) ─────────────────
  async checkPaymentStatus(orderId: string): Promise<any> {
    const order = await this.orderModel.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');

    // If already paid, return immediately
    if (order.status === 'PROCESSING') {
      return { status: 'PROCESSING', order };
    }

    // If we have a reference, verify with Paystack
    if (order.paymentReference) {
      try {
        const verification = await this.paystackService.verifyPayment(order.paymentReference);
        if (verification.data?.status === 'success') {
          order.status = 'PROCESSING';
          await order.save();

          // Reduce stock
          for (const item of order.items) {
            await this.productsService.updateStock(item.product.toString(), -item.quantity);
          }

          await this.sendConfirmationEmail(order);

          return { status: 'PROCESSING', order };
        }
        return { status: verification.data?.status || 'PENDING', order };
      } catch (e) {
        this.logger.warn(`Payment verification failed for ${orderId}: ${e.message}`);
      }
    }

    return { status: order.status, order };
  }

  async verifyPayment(reference: string): Promise<OrderDocument> {
    const verification = await this.paystackService.verifyPayment(reference);
    if (verification.data.status !== 'success') {
      throw new BadRequestException('Payment verification failed');
    }

    const orderId = verification.data.metadata.orderId;
    const order = await this.orderModel.findById(orderId).populate('items.product');
    if (!order) throw new NotFoundException('Order not found');

    if (order.status === 'PENDING') {
      order.status = 'PROCESSING';
      order.paymentReference = reference;
      await order.save();

      // Reduce stock
      for (const item of order.items) {
        await this.productsService.updateStock(item.product.toString(), -item.quantity);
      }

      await this.sendConfirmationEmail(order);
    }

    return order;
  }

  async findOne(id: string): Promise<OrderDocument> {
    const order = await this.orderModel.findById(id).populate('items.product');
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async findByUser(userId: string): Promise<OrderDocument[]> {
    return this.orderModel.find({ user: userId }).populate('items.product').sort({ createdAt: -1 }).exec();
  }

  async findAll(): Promise<OrderDocument[]> {
    return this.orderModel.find().populate('user').populate('items.product').sort({ createdAt: -1 }).exec();
  }

  async updateStatus(id: string, status: string): Promise<OrderDocument> {
    const order = await this.orderModel.findById(id);
    if (!order) throw new NotFoundException('Order not found');
    order.status = status as any;
    await order.save();
    return order;
  }

  async update(id: string, updateData: any): Promise<OrderDocument> {
    const order = await this.orderModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  // ─── HELPERS ────────────────────────────────────────
  private async sendConfirmationEmail(order: any): Promise<void> {
    try {
      const recipientEmail = order.user
        ? (await this.orderModel.findById(order._id).populate('user').then(o => (o as any).user?.email))
        : order.shippingAddress?.email;

      if (recipientEmail) {
        await this.resendService.sendEmail(
          recipientEmail,
          'Order Confirmed — Dobi Cakes ✨',
          this.buildConfirmationEmail(order),
        );
      }
    } catch (e) {
      this.logger.error(`Failed to send confirmation email: ${e.message}`);
    }
  }

  private buildConfirmationEmail(order: any): string {
    const items = order.items.map((item: any) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f3f3f3;font-size:13px;color:#333;">
          ${item.product?.name || 'Cake'} × ${item.quantity}
          ${item.customization?.flavor ? `<br/><span style="font-size:11px;color:#999;">Flavor: ${item.customization.flavor} | Size: ${item.customization.size}</span>` : ''}
          ${item.customization?.customMessage ? `<br/><span style="font-size:11px;color:#D4AF37;font-style:italic;">"${item.customization.customMessage}"</span>` : ''}
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #f3f3f3;font-size:13px;color:#D4AF37;text-align:right;font-weight:bold;">
          ₦${(item.price * item.quantity).toLocaleString()}
        </td>
      </tr>
    `).join('');

    return `
    <div style="max-width:600px;margin:0 auto;font-family:'Helvetica Neue',Arial,sans-serif;">
      <div style="background:#1a1a1a;padding:40px;text-align:center;">
        <h1 style="color:#D4AF37;font-size:24px;font-weight:300;letter-spacing:8px;margin:0;">Dobi Cakes</h1>
      </div>
      <div style="padding:40px;background:#fff;">
        <h2 style="font-size:20px;color:#1a1a1a;margin:0 0 8px 0;">Order Confirmed ✨</h2>
        <p style="font-size:13px;color:#666;line-height:1.6;margin:0 0 24px 0;">
          Thank you for your order! We've received your payment and our master bakers are preparing your creation.
        </p>
        <div style="background:#faf8f5;padding:20px;margin-bottom:24px;">
          <p style="font-size:11px;color:#999;letter-spacing:3px;margin:0 0 4px 0;">Order Reference</p>
          <p style="font-size:16px;color:#D4AF37;font-weight:bold;margin:0;">#${order._id.toString().slice(-8).toUpperCase()}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr>
              <th style="text-align:left;font-size:10px;color:#999;letter-spacing:2px;padding-bottom:8px;">Item</th>
              <th style="text-align:right;font-size:10px;color:#999;letter-spacing:2px;padding-bottom:8px;">Price</th>
            </tr>
          </thead>
          <tbody>${items}</tbody>
          <tfoot>
            <tr>
              <td style="padding:16px 0 0;font-size:14px;font-weight:bold;color:#1a1a1a;">Total</td>
              <td style="padding:16px 0 0;font-size:18px;font-weight:bold;color:#D4AF37;text-align:right;">₦${order.totalAmount.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div style="background:#1a1a1a;padding:24px;text-align:center;">
        <p style="font-size:11px;color:#666;margin:0;letter-spacing:2px;">© ${new Date().getFullYear()} Dobi Cakes — Handcrafted with Love</p>
      </div>
    </div>
    `;
  }
}
