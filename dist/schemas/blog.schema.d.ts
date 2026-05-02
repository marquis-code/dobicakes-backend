import { Document } from 'mongoose';
export type BlogDocument = Blog & Document;
export declare class Blog {
    title: string;
    content: string;
    image: string;
    author: string;
    isPublished: boolean;
}
export declare const BlogSchema: import("mongoose").Schema<Blog, import("mongoose").Model<Blog, any, any, any, (Document<unknown, any, Blog, any, import("mongoose").DefaultSchemaOptions> & Blog & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Blog, any, import("mongoose").DefaultSchemaOptions> & Blog & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, Blog>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Blog, Document<unknown, {}, Blog, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Blog & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Blog, Document<unknown, {}, Blog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    content?: import("mongoose").SchemaDefinitionProperty<string, Blog, Document<unknown, {}, Blog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    image?: import("mongoose").SchemaDefinitionProperty<string, Blog, Document<unknown, {}, Blog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    author?: import("mongoose").SchemaDefinitionProperty<string, Blog, Document<unknown, {}, Blog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isPublished?: import("mongoose").SchemaDefinitionProperty<boolean, Blog, Document<unknown, {}, Blog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Blog>;
