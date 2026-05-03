import { Controller, Post, Get, Body, Param, Patch, UseGuards, Req, Headers, HttpCode } from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { OptionalAuthGuard } from '../shared/guards/optional-auth.guard';
import { PaystackService } from '../shared/services/paystack.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly paystackService: PaystackService,
  ) {}

  // Guest-friendly: auth is optional
  @Post()
  @UseGuards(OptionalAuthGuard)
  create(@Body() createOrderDto: any, @Req() req: any) {
    const orderData = {
      ...createOrderDto,
      user: req.user?._id || undefined,
      userEmail: req.user?.email || createOrderDto.guestEmail,
    };
    return this.ordersService.create(orderData);
  }

  @Post('verify/:reference')
  verifyPayment(@Param('reference') reference: string) {
    return this.ordersService.verifyPayment(reference);
  }

  // ─── PAYSTACK WEBHOOK ─────────────────────────────
  @Post('webhook/paystack')
  @HttpCode(200)
  async handlePaystackWebhook(
    @Body() body: any,
    @Headers('x-paystack-signature') signature: string,
    @Req() req: any
  ) {
    // Verify webhook signature
    const rawBody = JSON.stringify(body);
    const isValid = this.paystackService.verifyWebhookSignature(rawBody, signature || '');
    
    if (!isValid) {
      console.warn('Invalid Paystack webhook signature');
      return { status: 'ignored' };
    }

    await this.ordersService.handleWebhook(body.event, body.data);
    return { status: 'ok' };
  }

  // ─── PAYMENT STATUS POLLING ────────────────────────
  @Get('payment-status/:orderId')
  async checkPaymentStatus(@Param('orderId') orderId: string) {
    return this.ordersService.checkPaymentStatus(orderId);
  }

  // IMPORTANT: static routes MUST come before parameterized routes
  @Get('user/my-orders')
  @UseGuards(JwtAuthGuard)
  findMyOrders(@Req() req: any) {
    return this.ordersService.findByUser(req.user._id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.ordersService.updateStatus(id, status);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateData: any) {
    // If only status is provided, use updateStatus
    if (updateData.status && Object.keys(updateData).length === 1) {
      return this.ordersService.updateStatus(id, updateData.status);
    }
    return this.ordersService.update(id, updateData);
  }
}
