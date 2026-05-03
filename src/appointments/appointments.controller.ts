import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Query } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/guards/roles.guard';
import { Roles } from '../shared/decorators/roles.decorator';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  // 1. Service Product Routes (Static routes FIRST)
  @Get('products')
  findAllProducts() {
    return this.appointmentsService.findAllProducts();
  }

  @Get('products/:id')
  findOneProduct(@Param('id') id: string) {
    return this.appointmentsService.findOneProduct(id);
  }

  @Post('products')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  createProduct(@Body() data: any) {
    return this.appointmentsService.createProduct(data);
  }

  @Patch('products/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  updateProduct(@Param('id') id: string, @Body() data: any) {
    return this.appointmentsService.updateProduct(id, data);
  }

  @Delete('products/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  deleteProduct(@Param('id') id: string) {
    return this.appointmentsService.deleteProduct(id);
  }

  // 2. Booking System Routes
  @Post()
  create(@Body() data: any) {
    return this.appointmentsService.createAppointment(data);
  }

  @Post('verify/:reference')
  verifyPayment(@Param('reference') reference: string) {
    return this.appointmentsService.verifyAppointmentPayment(reference);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  findByUser(@Param('userId') userId: string) {
    return this.appointmentsService.findByUser(userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  findAll() {
    return this.appointmentsService.findAll();
  }

  // 3. Dynamic ID Routes (Dynamic routes LAST to prevent collision with static routes)
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.appointmentsService.delete(id);
  }
}
