import { AppointmentsService } from './appointments.service';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    findAllProducts(): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/appointment-product.schema").AppointmentProduct, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/appointment-product.schema").AppointmentProduct & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOneProduct(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/appointment-product.schema").AppointmentProduct, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/appointment-product.schema").AppointmentProduct & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    createProduct(data: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/appointment-product.schema").AppointmentProduct, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/appointment-product.schema").AppointmentProduct & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateProduct(id: string, data: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/appointment-product.schema").AppointmentProduct, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/appointment-product.schema").AppointmentProduct & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteProduct(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/appointment-product.schema").AppointmentProduct, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/appointment-product.schema").AppointmentProduct & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    create(data: any): Promise<{
        appointment: import("mongoose").Document<unknown, {}, import("../schemas/appointment.schema").Appointment, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/appointment.schema").Appointment & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        paymentUrl: any;
        reference: any;
    }>;
    verifyPayment(reference: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/appointment.schema").Appointment, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/appointment.schema").Appointment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findByUser(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/appointment.schema").Appointment, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/appointment.schema").Appointment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/appointment.schema").Appointment, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/appointment.schema").Appointment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/appointment.schema").Appointment, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/appointment.schema").Appointment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/appointment.schema").Appointment, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/appointment.schema").Appointment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
