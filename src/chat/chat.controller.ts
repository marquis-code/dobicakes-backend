import { Controller, Get, Param, Patch } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('rooms')
  async getActiveRooms() {
    return this.chatService.getAllActiveChats();
  }

  @Get('history/:roomId')
  async getHistory(@Param('roomId') roomId: string) {
    return this.chatService.getMessages(roomId);
  }

  @Patch('read/:roomId')
  async markAsRead(@Param('roomId') roomId: string) {
    return this.chatService.markAsRead(roomId);
  }
}
