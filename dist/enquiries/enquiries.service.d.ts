import { Model } from 'mongoose';
import { Enquiry } from '../schemas/enquiry.schema';
export declare class EnquiriesService {
    private enquiryModel;
    constructor(enquiryModel: Model<Enquiry>);
    create(data: any): Promise<import("mongoose").Document<unknown, {}, Enquiry, {}, import("mongoose").DefaultSchemaOptions> & Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Enquiry, {}, import("mongoose").DefaultSchemaOptions> & Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, Enquiry, {}, import("mongoose").DefaultSchemaOptions> & Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    markAsRead(id: string): Promise<(import("mongoose").Document<unknown, {}, Enquiry, {}, import("mongoose").DefaultSchemaOptions> & Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    reply(id: string, adminReply: string): Promise<(import("mongoose").Document<unknown, {}, Enquiry, {}, import("mongoose").DefaultSchemaOptions> & Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    delete(id: string): Promise<(import("mongoose").Document<unknown, {}, Enquiry, {}, import("mongoose").DefaultSchemaOptions> & Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
