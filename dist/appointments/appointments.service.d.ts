import { Model, Types } from 'mongoose';
import { Appointment } from '../schemas/appointment.schema';
import { AppointmentProduct } from '../schemas/appointment-product.schema';
import { GoogleCalendarService } from '../shared/services/google-calendar.service';
import { PaystackService } from '../shared/services/paystack.service';
import { ResendService } from '../shared/services/resend.service';
export declare class AppointmentsService {
    private appointmentModel;
    private productModel;
    private calendarService;
    private paystackService;
    private resendService;
    constructor(appointmentModel: Model<Appointment>, productModel: Model<AppointmentProduct>, calendarService: GoogleCalendarService, paystackService: PaystackService, resendService: ResendService);
    createProduct(data: any): Promise<import("mongoose").Document<unknown, {}, AppointmentProduct, {}, import("mongoose").DefaultSchemaOptions> & AppointmentProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAllProducts(): Promise<(import("mongoose").Document<unknown, {}, AppointmentProduct, {}, import("mongoose").DefaultSchemaOptions> & AppointmentProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOneProduct(id: string): Promise<import("mongoose").Document<unknown, {}, AppointmentProduct, {}, import("mongoose").DefaultSchemaOptions> & AppointmentProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateProduct(id: string, data: any): Promise<(import("mongoose").Document<unknown, {}, AppointmentProduct, {}, import("mongoose").DefaultSchemaOptions> & AppointmentProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteProduct(id: string): Promise<(import("mongoose").Document<unknown, {}, AppointmentProduct, {}, import("mongoose").DefaultSchemaOptions> & AppointmentProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    checkAvailability(productId: string, requestedDate: Date): Promise<boolean>;
    createAppointment(data: any): Promise<{
        appointment: import("mongoose").Document<unknown, {}, Appointment, {}, import("mongoose").DefaultSchemaOptions> & Appointment & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        paymentUrl: any;
        reference: any;
    }>;
    verifyAppointmentPayment(reference: string): Promise<import("mongoose").Document<unknown, {}, Appointment, {}, import("mongoose").DefaultSchemaOptions> & Appointment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Appointment, {}, import("mongoose").DefaultSchemaOptions> & Appointment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Appointment, {}, import("mongoose").DefaultSchemaOptions> & Appointment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findByUser(userId: string): Promise<(import("mongoose").Document<unknown, {}, Appointment, {}, import("mongoose").DefaultSchemaOptions> & Appointment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    sendAppointmentReminders(): Promise<void>;
    delete(id: string): Promise<(import("mongoose").Document<unknown, {}, Appointment, {}, import("mongoose").DefaultSchemaOptions> & Appointment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
