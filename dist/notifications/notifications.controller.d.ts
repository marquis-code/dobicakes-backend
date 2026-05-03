import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/notification.schema").Notification, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/notification.schema").Notification & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findByUser(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/notification.schema").Notification, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/notification.schema").Notification & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    markAsRead(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/notification.schema").Notification, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/notification.schema").Notification & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    markAllAsReadAdmin(): Promise<import("mongoose").UpdateWriteOpResult>;
    markAllAsRead(userId: string): Promise<import("mongoose").UpdateWriteOpResult>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/notification.schema").Notification, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/notification.schema").Notification & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
