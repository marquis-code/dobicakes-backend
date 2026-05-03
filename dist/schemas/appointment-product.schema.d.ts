import { Document } from 'mongoose';
export declare class AppointmentProduct extends Document {
    title: string;
    description: string;
    price: number;
    duration: number;
    availability: {
        days: string[];
        startTime: string;
        endTime: string;
    };
    isActive: boolean;
    image: string;
}
export declare const AppointmentProductSchema: import("mongoose").Schema<AppointmentProduct, import("mongoose").Model<AppointmentProduct, any, any, any, (Document<unknown, any, AppointmentProduct, any, import("mongoose").DefaultSchemaOptions> & AppointmentProduct & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, AppointmentProduct, any, import("mongoose").DefaultSchemaOptions> & AppointmentProduct & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}), any, AppointmentProduct>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AppointmentProduct, Document<unknown, {}, AppointmentProduct, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<AppointmentProduct & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, AppointmentProduct, Document<unknown, {}, AppointmentProduct, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppointmentProduct & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, AppointmentProduct, Document<unknown, {}, AppointmentProduct, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppointmentProduct & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, AppointmentProduct, Document<unknown, {}, AppointmentProduct, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppointmentProduct & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    price?: import("mongoose").SchemaDefinitionProperty<number, AppointmentProduct, Document<unknown, {}, AppointmentProduct, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppointmentProduct & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    duration?: import("mongoose").SchemaDefinitionProperty<number, AppointmentProduct, Document<unknown, {}, AppointmentProduct, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppointmentProduct & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    availability?: import("mongoose").SchemaDefinitionProperty<{
        days: string[];
        startTime: string;
        endTime: string;
    }, AppointmentProduct, Document<unknown, {}, AppointmentProduct, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppointmentProduct & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, AppointmentProduct, Document<unknown, {}, AppointmentProduct, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppointmentProduct & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    image?: import("mongoose").SchemaDefinitionProperty<string, AppointmentProduct, Document<unknown, {}, AppointmentProduct, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AppointmentProduct & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, AppointmentProduct>;
