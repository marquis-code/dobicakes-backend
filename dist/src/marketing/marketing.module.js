"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const marketing_service_1 = require("./marketing.service");
const marketing_controller_1 = require("./marketing.controller");
const marketing_schema_1 = require("../schemas/marketing.schema");
const shared_module_1 = require("../shared/shared.module");
let MarketingModule = class MarketingModule {
};
exports.MarketingModule = MarketingModule;
exports.MarketingModule = MarketingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: marketing_schema_1.Promo.name, schema: marketing_schema_1.PromoSchema },
                { name: marketing_schema_1.Banner.name, schema: marketing_schema_1.BannerSchema },
                { name: marketing_schema_1.EmailTemplate.name, schema: marketing_schema_1.EmailTemplateSchema },
                { name: marketing_schema_1.EmailCampaign.name, schema: marketing_schema_1.EmailCampaignSchema },
            ]),
            shared_module_1.SharedModule,
        ],
        controllers: [marketing_controller_1.MarketingController],
        providers: [marketing_service_1.MarketingService],
    })
], MarketingModule);
//# sourceMappingURL=marketing.module.js.map