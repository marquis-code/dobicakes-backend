import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';
import { PaystackService } from '../shared/services/paystack.service';
import { ResendService } from '../shared/services/resend.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
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
    
    if (order.paymentMethod === 'PAYSTACK') {
      const payment = await this.paystackService.initializePayment(
        orderData.userEmail || orderData.shippingAddress.email,
        order.totalAmount,
        { orderId: order._id }
      );
      order.paymentReference = payment.data.reference;
      await order.save();
      return { order, payment };
    }

    if (order.paymentMethod === 'BANK_TRANSFER') {
      try {
        // 1. Create or fetch Paystack Customer
        const [firstName, ...lastNameParts] = (orderData.shippingAddress.name || 'Guest').split(' ');
        const customer = await this.paystackService.createCustomer(
          orderData.userEmail || orderData.shippingAddress.email || `guest_${order._id}@dobicakes.com`,
          firstName,
          lastNameParts.join(' ') || 'User',
          orderData.shippingAddress.phone
        );

        // 2. Create Virtual Account
        const va = await this.paystackService.createVirtualAccount(customer.data.customer_code);
        
        order.virtualAccount = {
          bankName: va.data.bank.name,
          accountNumber: va.data.account_number,
          accountName: va.data.account_name
        };
      } catch (err) {
        console.error('Virtual account creation failed:', err);
        // Fallback to manual transfer if automated VA fails
      }
    }

    await order.save();
    return { order };
  }

  async verifyPayment(reference: string): Promise<OrderDocument> {
    const verification = await this.paystackService.verifyPayment(reference);
    if (verification.data.status !== 'success') {
      throw new BadRequestException('Payment verification failed');
    }

    const orderId = verification.data.metadata.orderId;
    const order = await this.orderModel.findById(orderId).populate('items.product');
    if (!order) throw new NotFoundException('Order not found');

    order.status = 'PAID';
    order.paymentReference = reference;
    await order.save();

    // Reduce stock
    for (const item of order.items) {
      await this.productsService.updateStock(item.product.toString(), -item.quantity);
    }

    // Send confirmation email
    const recipientEmail = order.user
      ? (await this.orderModel.findById(orderId).populate('user').then(o => (o as any).user?.email))
      : order.shippingAddress?.email;

    if (recipientEmail) {
      await this.resendService.sendEmail(
        recipientEmail,
        'Order Confirmed — Dobi Cakes ✨',
        this.buildConfirmationEmail(order),
      );
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
