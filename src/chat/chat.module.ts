import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat.gateway';
import { ChatMessage, ChatMessageSchema } from '../schemas/chat-message.schema';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { NotificationsModule } from '../notifications/notifications.module';
import { CloudinaryService } from '../shared/services/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ChatMessage.name, schema: ChatMessageSchema }]),
    NotificationsModule,
  ],
  providers: [ChatGateway, ChatService, CloudinaryService],
  controllers: [ChatController],
})
export class ChatModule {}
