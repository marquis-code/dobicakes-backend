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
exports.MarketingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const marketing_schema_1 = require("../schemas/marketing.schema");
const resend_service_1 = require("../shared/services/resend.service");
let MarketingService = class MarketingService {
    promoModel;
    bannerModel;
    templateModel;
    campaignModel;
    resendService;
    constructor(promoModel, bannerModel, templateModel, campaignModel, resendService) {
        this.promoModel = promoModel;
        this.bannerModel = bannerModel;
        this.templateModel = templateModel;
        this.campaignModel = campaignModel;
        this.resendService = resendService;
    }
    async getActiveBanners() {
        return this.bannerModel.find({ active: true }).sort({ order: 1 }).lean().exec();
    }
    async createBanner(data) {
        return this.bannerModel.create(data);
    }
    async validatePromo(code) {
        const promo = await this.promoModel.findOne({ code, isActive: true }).lean().exec();
        if (!promo)
            throw new common_1.NotFoundException('Invalid or expired promo code');
        if (new Date() > promo.expiryDate)
            throw new common_1.BadRequestException('Promo code has expired');
        if (promo.usageLimit > 0 && promo.usageCount >= promo.usageLimit)
            throw new common_1.BadRequestException('Usage limit reached');
        return promo;
    }
    async getPromos() {
        return this.promoModel.find().sort({ createdAt: -1 }).lean().exec();
    }
    async createPromo(data) {
        return this.promoModel.create(data);
    }
    async getTemplates() {
        return this.templateModel.find().lean().exec();
    }
    async createTemplate(data) {
        return this.templateModel.create(data);
    }
    async sendCampaign(campaignId) {
        const campaign = await this.campaignModel.findById(campaignId).exec();
        if (!campaign)
            throw new common_1.NotFoundException('Campaign not found');
        const template = await this.templateModel.findById(campaign.templateId).lean().exec();
        if (!template)
            throw new common_1.NotFoundException('Template not found');
        campaign.status = 'sent';
        campaign.sentAt = new Date();
        await campaign.save();
        return { success: true };
    }
};
exports.MarketingService = MarketingService;
exports.MarketingService = MarketingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(marketing_schema_1.Promo.name)),
    __param(1, (0, mongoose_1.InjectModel)(marketing_schema_1.Banner.name)),
    __param(2, (0, mongoose_1.InjectModel)(marketing_schema_1.EmailTemplate.name)),
    __param(3, (0, mongoose_1.InjectModel)(marketing_schema_1.EmailCampaign.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        resend_service_1.ResendService])
], MarketingService);
//# sourceMappingURL=marketing.service.js.map