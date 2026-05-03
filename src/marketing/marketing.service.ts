import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Promo, Banner, EmailTemplate, EmailCampaign } from '../schemas/marketing.schema';
import { Subscription } from '../schemas/subscription.schema';
import { ResendService } from '../shared/services/resend.service';

@Injectable()
export class MarketingService {
  constructor(
    @InjectModel(Promo.name) private promoModel: Model<Promo>,
    @InjectModel(Banner.name) private bannerModel: Model<Banner>,
    @InjectModel(EmailTemplate.name) private templateModel: Model<EmailTemplate>,
    @InjectModel(EmailCampaign.name) private campaignModel: Model<EmailCampaign>,
    @InjectModel(Subscription.name) private subscriptionModel: Model<Subscription>,
    private resendService: ResendService,
  ) {}

  // Subscriptions
  async getSubscriptions() {
    return this.subscriptionModel.find().sort({ createdAt: -1 }).lean().exec();
  }

  async subscribe(email: string, source?: string) {
    return this.subscriptionModel.findOneAndUpdate(
      { email },
      { email, source, isActive: true },
      { upsert: true, new: true }
    );
  }

  async unsubscribe(email: string) {
    return this.subscriptionModel.findOneAndUpdate({ email }, { isActive: false });
  }

  // Banners
  async getActiveBanners() {
    return this.bannerModel.find({ active: true }).sort({ order: 1 }).lean().exec();
  }

  async getAllBanners() {
    return this.bannerModel.find().sort({ order: 1 }).lean().exec();
  }

  async createBanner(data: any) {
    return this.bannerModel.create(data);
  }

  async updateBanner(id: string, data: any) {
    const banner = await this.bannerModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!banner) throw new NotFoundException('Banner not found');
    return banner;
  }

  async deleteBanner(id: string) {
    const result = await this.bannerModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Banner not found');
    return { success: true };
  }

  // Promos
  async validatePromo(code: string) {
    const promo = await this.promoModel.findOne({ code, isActive: true }).lean().exec();
    if (!promo) throw new NotFoundException('Invalid or expired promo code');
    
    if (new Date() > promo.expiryDate) throw new BadRequestException('Promo code has expired');
    if (promo.usageLimit > 0 && promo.usageCount >= promo.usageLimit) throw new BadRequestException('Usage limit reached');
    
    return promo;
  }

  async getPromos() {
    return this.promoModel.find().sort({ createdAt: -1 }).lean().exec();
  }

  async createPromo(data: any) {
    return this.promoModel.create(data);
  }

  // Email Marketing
  async getTemplates() {
    return this.templateModel.find().lean().exec();
  }

  async createTemplate(data: any) {
    return this.templateModel.create(data);
  }

  async sendCampaign(campaignId: string) {
    const campaign = await this.campaignModel.findById(campaignId).exec();
    if (!campaign) throw new NotFoundException('Campaign not found');
    
    const template = await this.templateModel.findById(campaign.templateId).lean().exec();
    if (!template) throw new NotFoundException('Template not found');

    // This would typically fetch users and loop, simplified for now
    campaign.status = 'sent';
    campaign.sentAt = new Date();
    await campaign.save();

    return { success: true };
  }
}
