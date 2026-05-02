import { Controller, Post, Get, Body, Param, Patch, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { OptionalAuthGuard } from '../shared/guards/optional-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

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
}
