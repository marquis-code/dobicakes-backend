import { MarketingService } from './marketing.service';
export declare class MarketingController {
    private readonly marketingService;
    constructor(marketingService: MarketingService);
    getActiveBanners(): Promise<(import("../schemas/marketing.schema").Banner & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getAllBanners(): Promise<(import("../schemas/marketing.schema").Banner & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    createBanner(data: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/marketing.schema").Banner, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/marketing.schema").Banner & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateBanner(id: string, data: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/marketing.schema").Banner, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/marketing.schema").Banner & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    deleteBanner(id: string): Promise<{
        success: boolean;
    }>;
    subscribe(data: {
        email: string;
        source?: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("../schemas/subscription.schema").Subscription, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/subscription.schema").Subscription & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getSubscriptions(): Promise<(import("../schemas/subscription.schema").Subscription & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    validatePromo(code: string): Promise<import("../schemas/marketing.schema").Promo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getPromos(): Promise<(import("../schemas/marketing.schema").Promo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    createPromo(data: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/marketing.schema").Promo, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/marketing.schema").Promo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    createTemplate(data: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/marketing.schema").EmailTemplate, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/marketing.schema").EmailTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
