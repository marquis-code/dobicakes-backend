import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'notifications',
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Notification Client connected: ${client.id}`);
    // Join admin room if needed, or handle based on roles
    client.join('admin-room');
  }

  handleDisconnect(client: Socket) {
    console.log(`Notification Client disconnected: ${client.id}`);
  }

  sendToAdmin(event: string, payload: any) {
    this.server.to('admin-room').emit(event, payload);
  }
}
