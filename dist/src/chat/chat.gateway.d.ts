import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private chatService;
    constructor(chatService: ChatService);
    server: Server;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleMessage(client: Socket, payload: {
        userName: string;
        userEmail: string;
        message: string;
        roomId: string;
        senderType: 'USER' | 'ADMIN';
    }): Promise<void>;
    handleJoinRoom(client: Socket, roomId: string): void;
}
