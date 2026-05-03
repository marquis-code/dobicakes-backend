import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatMessageDocument = ChatMessage & Document;

@Schema({ timestamps: true })
export class ChatMessage {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  userEmail: string;

  @Prop({ default: '' })
  message: string;

  @Prop({ required: true, enum: ['USER', 'ADMIN'] })
  senderType: 'USER' | 'ADMIN';

  @Prop({ default: false })
  isRead: boolean;

  @Prop()
  roomId: string;

  @Prop({ type: [String], default: [] })
  attachments: string[];
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
