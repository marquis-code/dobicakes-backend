import { Document } from 'mongoose';
export type FormDocument = Form & Document;
export declare class Form {
    title: string;
    description: string;
    fields: Array<{
        label: string;
        type: 'text' | 'number' | 'email' | 'select' | 'textarea';
        required: boolean;
        options?: string[];
    }>;
    responses: Array<{
        submittedAt: Date;
        data: Record<string, any>;
    }>;
    isActive: boolean;
}
export declare const FormSchema: import("mongoose").Schema<Form, import("mongoose").Model<Form, any, any, any, (Document<unknown, any, Form, any, import("mongoose").DefaultSchemaOptions> & Form & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Form, any, import("mongoose").DefaultSchemaOptions> & Form & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, Form>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Form, Document<unknown, {}, Form, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Form & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Form, Document<unknown, {}, Form, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Form & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Form, Document<unknown, {}, Form, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Form & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    fields?: import("mongoose").SchemaDefinitionProperty<{
        label: string;
        type: "text" | "number" | "email" | "select" | "textarea";
        required: boolean;
        options?: string[];
    }[], Form, Document<unknown, {}, Form, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Form & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    responses?: import("mongoose").SchemaDefinitionProperty<{
        submittedAt: Date;
        data: Record<string, any>;
    }[], Form, Document<unknown, {}, Form, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Form & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Form, Document<unknown, {}, Form, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Form & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Form>;
