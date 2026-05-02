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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailCampaignSchema = exports.EmailCampaign = exports.EmailTemplateSchema = exports.EmailTemplate = exports.BannerSchema = exports.Banner = exports.PromoSchema = exports.Promo = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Promo = class Promo {
    code;
    discountType;
    value;
    expiryDate;
    isActive;
    usageLimit;
    usageCount;
};
exports.Promo = Promo;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, index: true }),
    __metadata("design:type", String)
], Promo.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['percentage', 'fixed'] }),
    __metadata("design:type", String)
], Promo.prototype, "discountType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Promo.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Promo.prototype, "expiryDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Promo.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Promo.prototype, "usageLimit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Promo.prototype, "usageCount", void 0);
exports.Promo = Promo = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Promo);
exports.PromoSchema = mongoose_1.SchemaFactory.createForClass(Promo);
let Banner = class Banner {
    imageUrl;
    link;
    title;
    subtitle;
    active;
    order;
};
exports.Banner = Banner;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Banner.prototype, "imageUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '#' }),
    __metadata("design:type", String)
], Banner.prototype, "link", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Banner.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Banner.prototype, "subtitle", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Banner.prototype, "active", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Banner.prototype, "order", void 0);
exports.Banner = Banner = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Banner);
exports.BannerSchema = mongoose_1.SchemaFactory.createForClass(Banner);
let EmailTemplate = class EmailTemplate {
    name;
    subject;
    htmlContent;
};
exports.EmailTemplate = EmailTemplate;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "subject", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EmailTemplate.prototype, "htmlContent", void 0);
exports.EmailTemplate = EmailTemplate = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], EmailTemplate);
exports.EmailTemplateSchema = mongoose_1.SchemaFactory.createForClass(EmailTemplate);
let EmailCampaign = class EmailCampaign {
    name;
    templateId;
    status;
    sentAt;
    recipientsCount;
};
exports.EmailCampaign = EmailCampaign;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EmailCampaign.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, ref: 'EmailTemplate' }),
    __metadata("design:type", String)
], EmailCampaign.prototype, "templateId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'draft', enum: ['draft', 'sending', 'sent', 'failed'] }),
    __metadata("design:type", String)
], EmailCampaign.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], EmailCampaign.prototype, "sentAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], EmailCampaign.prototype, "recipientsCount", void 0);
exports.EmailCampaign = EmailCampaign = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], EmailCampaign);
exports.EmailCampaignSchema = mongoose_1.SchemaFactory.createForClass(EmailCampaign);
//# sourceMappingURL=marketing.schema.js.map