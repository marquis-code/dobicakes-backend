import { Document, Types } from 'mongoose';
export declare class Appointment extends Document {
    user: Types.ObjectId;
    product: Types.ObjectId;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    scheduledAt: Date;
    notes: string;
    status: string;
    price: number;
    paymentStatus: string;
    paymentReference: string;
    googleMeetLink: string;
    googleCalendarEventId: string;
    duration: number;
    reminderSent: boolean;
}
export declare const AppointmentSchema: import("mongoose").Schema<Appointment, import("mongoose").Model<Appointment, any, any, any, (Document<unknown, any, Appointment, any, import("mongoose").DefaultSchemaOptions> & Appointment & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Appointment, any, import("mongoose").DefaultSchemaOptions> & Appointment & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}), any, Appointment>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Appointment, Document<unknown, {}, Appointment, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Appointment, Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    user?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Appointment, Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    product?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Appointment, Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    customerName?: import("mongoose").SchemaDefinitionProperty<string, Appointment, Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    customerEmail?: import("mongoose").SchemaDefinitionProperty<string, Appointment, Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    customerPhone?: import("mongoose").SchemaDefinitionProperty<string, Appointment, Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    scheduledAt?: import("mongoose").SchemaDefinitionProperty<Date, Appointment, Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string, Appointment, Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Appointment, Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    price?: import("mongoose").SchemaDefinitionProperty<number, Appointment, Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    paymentStatus?: import("mongoose").SchemaDefinitionProperty<string, Appointment, Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    paymentReference?: import("mongoose").SchemaDefinitionProperty<string, Appointment, Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    googleMeetLink?: import("mongoose").SchemaDefinitionProperty<string, Appointment, Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    googleCalendarEventId?: import("mongoose").SchemaDefinitionProperty<string, Appointment, Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    duration?: import("mongoose").SchemaDefinitionProperty<number, Appointment, Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    reminderSent?: import("mongoose").SchemaDefinitionProperty<boolean, Appointment, Document<unknown, {}, Appointment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Appointment & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Appointment>;
