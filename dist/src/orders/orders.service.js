"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("../schemas/order.schema");
const paystack_service_1 = require("../shared/services/paystack.service");
const resend_service_1 = require("../shared/services/resend.service");
const products_service_1 = require("../products/products.service");
let OrdersService = class OrdersService {
    orderModel;
    paystackService;
    resendService;
    productsService;
    constructor(orderModel, paystackService, resendService, productsService) {
        this.orderModel = orderModel;
        this.paystackService = paystackService;
        this.resendService = resendService;
        this.productsService = productsService;
    }
    async create(orderData) {
        for (const item of orderData.items) {
            const product = await this.productsService.findOne(item.product);
            if (product.stock < item.quantity) {
                throw new common_1.BadRequestException(`Insufficient stock for ${product.name}`);
            }
        }
        const order = new this.orderModel(orderData);
        if (order.paymentMethod === 'PAYSTACK') {
            const payment = await this.paystackService.initializePayment(orderData.userEmail || orderData.shippingAddress.email, order.totalAmount, { orderId: order._id });
            order.paymentReference = payment.data.reference;
            await order.save();
            return { order, payment };
        }
        if (order.paymentMethod === 'BANK_TRANSFER') {
            try {
                const [firstName, ...lastNameParts] = (orderData.shippingAddress.name || 'Guest').split(' ');
                const customer = await this.paystackService.createCustomer(orderData.userEmail || orderData.shippingAddress.email || `guest_${order._id}@dobicakes.com`, firstName, lastNameParts.join(' ') || 'User', orderData.shippingAddress.phone);
                const va = await this.paystackService.createVirtualAccount(customer.data.customer_code);
                order.virtualAccount = {
                    bankName: va.data.bank.name,
                    accountNumber: va.data.account_number,
                    accountName: va.data.account_name
                };
            }
            catch (err) {
                console.error('Virtual account creation failed:', err);
            }
        }
        await order.save();
        return { order };
    }
    async verifyPayment(reference) {
        const verification = await this.paystackService.verifyPayment(reference);
        if (verification.data.status !== 'success') {
            throw new common_1.BadRequestException('Payment verification failed');
        }
        const orderId = verification.data.metadata.orderId;
        const order = await this.orderModel.findById(orderId).populate('items.product');
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        order.status = 'PAID';
        order.paymentReference = reference;
        await order.save();
        for (const item of order.items) {
            await this.productsService.updateStock(item.product.toString(), -item.quantity);
        }
        const recipientEmail = order.user
            ? (await this.orderModel.findById(orderId).populate('user').then(o => o.user?.email))
            : order.shippingAddress?.email;
        if (recipientEmail) {
            await this.resendService.sendEmail(recipientEmail, 'Order Confirmed — Dobi Cakes ✨', this.buildConfirmationEmail(order));
        }
        return order;
    }
    async findOne(id) {
        const order = await this.orderModel.findById(id).populate('items.product');
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async findByUser(userId) {
        return this.orderModel.find({ user: userId }).populate('items.product').sort({ createdAt: -1 }).exec();
    }
    async findAll() {
        return this.orderModel.find().populate('user').populate('items.product').sort({ createdAt: -1 }).exec();
    }
    async updateStatus(id, status) {
        const order = await this.orderModel.findById(id);
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        order.status = status;
        await order.save();
        return order;
    }
    buildConfirmationEmail(order) {
        const items = order.items.map((item) => `
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
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        paystack_service_1.PaystackService,
        resend_service_1.ResendService,
        products_service_1.ProductsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map