import { ChatService } from './chat.service';
import { CloudinaryService } from '../shared/services/cloudinary.service';
export declare class ChatController {
    private chatService;
    private cloudinaryService;
    private readonly logger;
    constructor(chatService: ChatService, cloudinaryService: CloudinaryService);
    uploadFile(file: Express.Multer.File): Promise<{
        url: string;
        originalName: string;
        size: number;
    }>;
    getActiveRooms(): Promise<any[]>;
    getHistory(roomId: string): Promise<import("../schemas/chat-message.schema").ChatMessageDocument[]>;
    markAsRead(roomId: string): Promise<import("mongoose").UpdateWriteOpResult>;
}
