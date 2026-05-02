import { Document } from 'mongoose';
export type PromoDocument = Promo & Document;
export declare class Promo {
    code: string;
    discountType: string;
    value: number;
    expiryDate: Date;
    isActive: boolean;
    usageLimit: number;
    usageCount: number;
}
export declare const PromoSchema: import("mongoose").Schema<Promo, import("mongoose").Model<Promo, any, any, any, (Document<unknown, any, Promo, any, import("mongoose").DefaultSchemaOptions> & Promo & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Promo, any, import("mongoose").DefaultSchemaOptions> & Promo & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, Promo>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Promo, Document<unknown, {}, Promo, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Promo & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    code?: import("mongoose").SchemaDefinitionProperty<string, Promo, Document<unknown, {}, Promo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Promo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    discountType?: import("mongoose").SchemaDefinitionProperty<string, Promo, Document<unknown, {}, Promo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Promo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    value?: import("mongoose").SchemaDefinitionProperty<number, Promo, Document<unknown, {}, Promo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Promo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    expiryDate?: import("mongoose").SchemaDefinitionProperty<Date, Promo, Document<unknown, {}, Promo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Promo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Promo, Document<unknown, {}, Promo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Promo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    usageLimit?: import("mongoose").SchemaDefinitionProperty<number, Promo, Document<unknown, {}, Promo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Promo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    usageCount?: import("mongoose").SchemaDefinitionProperty<number, Promo, Document<unknown, {}, Promo, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Promo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Promo>;
export type BannerDocument = Banner & Document;
export declare class Banner {
    imageUrl: string;
    link: string;
    title: string;
    subtitle: string;
    active: boolean;
    order: number;
}
export declare const BannerSchema: import("mongoose").Schema<Banner, import("mongoose").Model<Banner, any, any, any, (Document<unknown, any, Banner, any, import("mongoose").DefaultSchemaOptions> & Banner & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Banner, any, import("mongoose").DefaultSchemaOptions> & Banner & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, Banner>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Banner, Document<unknown, {}, Banner, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Banner & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    imageUrl?: import("mongoose").SchemaDefinitionProperty<string, Banner, Document<unknown, {}, Banner, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Banner & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    link?: import("mongoose").SchemaDefinitionProperty<string, Banner, Document<unknown, {}, Banner, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Banner & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, Banner, Document<unknown, {}, Banner, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Banner & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    subtitle?: import("mongoose").SchemaDefinitionProperty<string, Banner, Document<unknown, {}, Banner, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Banner & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    active?: import("mongoose").SchemaDefinitionProperty<boolean, Banner, Document<unknown, {}, Banner, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Banner & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    order?: import("mongoose").SchemaDefinitionProperty<number, Banner, Document<unknown, {}, Banner, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Banner & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Banner>;
export type EmailTemplateDocument = EmailTemplate & Document;
export declare class EmailTemplate {
    name: string;
    subject: string;
    htmlContent: string;
}
export declare const EmailTemplateSchema: import("mongoose").Schema<EmailTemplate, import("mongoose").Model<EmailTemplate, any, any, any, (Document<unknown, any, EmailTemplate, any, import("mongoose").DefaultSchemaOptions> & EmailTemplate & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, EmailTemplate, any, import("mongoose").DefaultSchemaOptions> & EmailTemplate & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, EmailTemplate>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EmailTemplate, Document<unknown, {}, EmailTemplate, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<EmailTemplate & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, EmailTemplate, Document<unknown, {}, EmailTemplate, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EmailTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    subject?: import("mongoose").SchemaDefinitionProperty<string, EmailTemplate, Document<unknown, {}, EmailTemplate, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EmailTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    htmlContent?: import("mongoose").SchemaDefinitionProperty<string, EmailTemplate, Document<unknown, {}, EmailTemplate, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EmailTemplate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, EmailTemplate>;
export type EmailCampaignDocument = EmailCampaign & Document;
export declare class EmailCampaign {
    name: string;
    templateId: string;
    status: string;
    sentAt: Date;
    recipientsCount: number;
}
export declare const EmailCampaignSchema: import("mongoose").Schema<EmailCampaign, import("mongoose").Model<EmailCampaign, any, any, any, (Document<unknown, any, EmailCampaign, any, import("mongoose").DefaultSchemaOptions> & EmailCampaign & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, EmailCampaign, any, import("mongoose").DefaultSchemaOptions> & EmailCampaign & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, EmailCampaign>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EmailCampaign, Document<unknown, {}, EmailCampaign, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<EmailCampaign & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, EmailCampaign, Document<unknown, {}, EmailCampaign, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EmailCampaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    templateId?: import("mongoose").SchemaDefinitionProperty<string, EmailCampaign, Document<unknown, {}, EmailCampaign, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EmailCampaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, EmailCampaign, Document<unknown, {}, EmailCampaign, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EmailCampaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    sentAt?: import("mongoose").SchemaDefinitionProperty<Date, EmailCampaign, Document<unknown, {}, EmailCampaign, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EmailCampaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    recipientsCount?: import("mongoose").SchemaDefinitionProperty<number, EmailCampaign, Document<unknown, {}, EmailCampaign, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EmailCampaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, EmailCampaign>;
