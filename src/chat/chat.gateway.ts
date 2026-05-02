import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: { 
    userName: string; 
    userEmail: string; 
    message: string; 
    roomId: string;
    senderType: 'USER' | 'ADMIN'
  }) {
    const savedMessage = await this.chatService.saveMessage(payload);
    
    // Broadcast to the room
    this.server.to(payload.roomId).emit('message', savedMessage);
    
    // Notify admin if message is from user
    if (payload.senderType === 'USER') {
      this.server.emit('adminNotification', {
        type: 'NEW_MESSAGE',
        userName: payload.userName,
        roomId: payload.roomId
      });
    }
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomId: string) {
    client.join(roomId);
  }
}
