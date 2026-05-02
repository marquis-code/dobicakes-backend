import { Model } from 'mongoose';
import { Appointment } from '../schemas/appointment.schema';
export declare class AppointmentsService {
    private appointmentModel;
    constructor(appointmentModel: Model<Appointment>);
    create(data: any): Promise<import("mongoose").Document<unknown, {}, Appointment, {}, import("mongoose").DefaultSchemaOptions> & Appointment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Appointment, {}, import("mongoose").DefaultSchemaOptions> & Appointment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, Appointment, {}, import("mongoose").DefaultSchemaOptions> & Appointment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    findByUser(userId: string): Promise<(import("mongoose").Document<unknown, {}, Appointment, {}, import("mongoose").DefaultSchemaOptions> & Appointment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    updateStatus(id: string, status: string): Promise<(import("mongoose").Document<unknown, {}, Appointment, {}, import("mongoose").DefaultSchemaOptions> & Appointment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    delete(id: string): Promise<(import("mongoose").Document<unknown, {}, Appointment, {}, import("mongoose").DefaultSchemaOptions> & Appointment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
