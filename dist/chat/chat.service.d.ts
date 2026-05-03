import { Model } from 'mongoose';
import { ChatMessageDocument } from '../schemas/chat-message.schema';
import { NotificationsService } from '../notifications/notifications.service';
export declare class ChatService {
    private chatModel;
    private readonly notificationsService;
    constructor(chatModel: Model<ChatMessageDocument>, notificationsService: NotificationsService);
    saveMessage(data: any): Promise<ChatMessageDocument>;
    getMessages(roomId: string): Promise<ChatMessageDocument[]>;
    getAllActiveChats(): Promise<any[]>;
    markAsRead(roomId: string): Promise<import("mongoose").UpdateWriteOpResult>;
}
