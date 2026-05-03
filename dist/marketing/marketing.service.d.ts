import { Model } from 'mongoose';
import { Promo, Banner, EmailTemplate, EmailCampaign } from '../schemas/marketing.schema';
import { Subscription } from '../schemas/subscription.schema';
import { ResendService } from '../shared/services/resend.service';
export declare class MarketingService {
    private promoModel;
    private bannerModel;
    private templateModel;
    private campaignModel;
    private subscriptionModel;
    private resendService;
    constructor(promoModel: Model<Promo>, bannerModel: Model<Banner>, templateModel: Model<EmailTemplate>, campaignModel: Model<EmailCampaign>, subscriptionModel: Model<Subscription>, resendService: ResendService);
    getSubscriptions(): Promise<(Subscription & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    subscribe(email: string, source?: string): Promise<import("mongoose").Document<unknown, {}, Subscription, {}, import("mongoose").DefaultSchemaOptions> & Subscription & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    unsubscribe(email: string): Promise<(import("mongoose").Document<unknown, {}, Subscription, {}, import("mongoose").DefaultSchemaOptions> & Subscription & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getActiveBanners(): Promise<(Banner & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getAllBanners(): Promise<(Banner & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    createBanner(data: any): Promise<import("mongoose").Document<unknown, {}, Banner, {}, import("mongoose").DefaultSchemaOptions> & Banner & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateBanner(id: string, data: any): Promise<import("mongoose").Document<unknown, {}, Banner, {}, import("mongoose").DefaultSchemaOptions> & Banner & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    deleteBanner(id: string): Promise<{
        success: boolean;
    }>;
    validatePromo(code: string): Promise<Promo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getPromos(): Promise<(Promo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    createPromo(data: any): Promise<import("mongoose").Document<unknown, {}, Promo, {}, import("mongoose").DefaultSchemaOptions> & Promo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getTemplates(): Promise<(EmailTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    createTemplate(data: any): Promise<import("mongoose").Document<unknown, {}, EmailTemplate, {}, import("mongoose").DefaultSchemaOptions> & EmailTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    sendCampaign(campaignId: string): Promise<{
        success: boolean;
    }>;
}
