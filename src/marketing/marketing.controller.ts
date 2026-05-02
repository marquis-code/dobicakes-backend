import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/guards/roles.guard';
import { Roles } from '../shared/decorators/roles.decorator';

@Controller('marketing')
export class MarketingController {
  constructor(private readonly marketingService: MarketingService) {}

  // Public
  @Get('banners')
  getBanners() {
    return this.marketingService.getActiveBanners();
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
