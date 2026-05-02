import { Model } from 'mongoose';
import { ChatMessageDocument } from '../schemas/chat-message.schema';
export declare class ChatService {
    private chatModel;
    constructor(chatModel: Model<ChatMessageDocument>);
    saveMessage(data: any): Promise<ChatMessageDocument>;
    getMessages(roomId: string): Promise<ChatMessageDocument[]>;
    getAllActiveChats(): Promise<any[]>;
    markAsRead(roomId: string): Promise<import("mongoose").UpdateWriteOpResult>;
}
