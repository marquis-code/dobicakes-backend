import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatMessage, ChatMessageDocument } from '../schemas/chat-message.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatMessage.name) private chatModel: Model<ChatMessageDocument>,
  ) {}

  async saveMessage(data: any): Promise<ChatMessageDocument> {
    const newMessage = new this.chatModel(data);
    return newMessage.save();
  }

  async getMessages(roomId: string): Promise<ChatMessageDocument[]> {
    return this.chatModel.find({ roomId }).sort({ createdAt: 1 }).exec();
  }

  async getAllActiveChats(): Promise<any[]> {
    return this.chatModel.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$roomId',
          lastMessage: { $first: '$message' },
          userName: { $first: '$userName' },
          userEmail: { $first: '$userEmail' },
          createdAt: { $first: '$createdAt' },
          unreadCount: {
            $sum: { $cond: [{ $and: [{ $eq: ['$isRead', false] }, { $eq: ['$senderType', 'USER'] }] }, 1, 0] },
          },
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
  }

  async markAsRead(roomId: string) {
    return this.chatModel.updateMany({ roomId, senderType: 'USER' }, { isRead: true }).exec();
  }
}
