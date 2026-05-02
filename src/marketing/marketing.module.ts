import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketingService } from './marketing.service';
import { MarketingController } from './marketing.controller';
import { Promo, PromoSchema, Banner, BannerSchema, EmailTemplate, EmailTemplateSchema, EmailCampaign, EmailCampaignSchema } from '../schemas/marketing.schema';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Promo.name, schema: PromoSchema },
      { name: Banner.name, schema: BannerSchema },
      { name: EmailTemplate.name, schema: EmailTemplateSchema },
      { name: EmailCampaign.name, schema: EmailCampaignSchema },
    ]),
    SharedModule,
  ],
  controllers: [MarketingController],
  providers: [MarketingService],
})
export class MarketingModule {}
