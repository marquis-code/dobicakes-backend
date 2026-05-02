import { EnquiriesService } from './enquiries.service';
export declare class EnquiriesController {
    private readonly enquiriesService;
    constructor(enquiriesService: EnquiriesService);
    create(data: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/enquiry.schema").Enquiry, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/enquiry.schema").Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/enquiry.schema").Enquiry, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/enquiry.schema").Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/enquiry.schema").Enquiry, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/enquiry.schema").Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    markAsRead(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/enquiry.schema").Enquiry, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/enquiry.schema").Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    reply(id: string, adminReply: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/enquiry.schema").Enquiry, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/enquiry.schema").Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/enquiry.schema").Enquiry, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/enquiry.schema").Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
