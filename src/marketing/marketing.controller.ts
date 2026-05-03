import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/guards/roles.guard';
import { Roles } from '../shared/decorators/roles.decorator';

@Controller('marketing')
export class MarketingController {
  constructor(private readonly marketingService: MarketingService) {}

  // Public
  @Get('banners/active')
  getActiveBanners() {
    return this.marketingService.getActiveBanners();
  }

  @Get('banners')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getAllBanners() {
    return this.marketingService.getAllBanners();
  }

  @Post('banners')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  createBanner(@Body() data: any) {
    return this.marketingService.createBanner(data);
  }

  @Patch('banners/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  updateBanner(@Param('id') id: string, @Body() data: any) {
    return this.marketingService.updateBanner(id, data);
  }

  @Delete('banners/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  deleteBanner(@Param('id') id: string) {
    return this.marketingService.deleteBanner(id);
  }

  @Post('subscribe')
  subscribe(@Body() data: { email: string; source?: string }) {
    return this.marketingService.subscribe(data.email, data.source);
  }

  // Admin
  @Get('subscriptions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getSubscriptions() {
    return this.marketingService.getSubscriptions();
  }

  @Post('promos/validate')
  @UseGuards(JwtAuthGuard)
  validatePromo(@Body('code') code: string) {
    return this.marketingService.validatePromo(code);
  }

  // Admin
  @Get('promos')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getPromos() {
    return this.marketingService.getPromos();
  }

  @Post('promos')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  createPromo(@Body() data: any) {
    return this.marketingService.createPromo(data);
  }

  @Post('email-templates')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  createTemplate(@Body() data: any) {
    return this.marketingService.createTemplate(data);
  }
}
