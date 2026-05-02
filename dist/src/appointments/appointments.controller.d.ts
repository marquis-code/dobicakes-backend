import { AppointmentsService } from './appointments.service';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(data: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/appointment.schema").Appointment, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/appointment.schema").Appointment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/appointment.schema").Appointment, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/appointment.schema").Appointment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/appointment.schema").Appointment, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/appointment.schema").Appointment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    updateStatus(id: string, status: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/appointment.schema").Appointment, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/appointment.schema").Appointment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/appointment.schema").Appointment, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/appointment.schema").Appointment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
