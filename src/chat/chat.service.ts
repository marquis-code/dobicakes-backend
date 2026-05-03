import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatMessage, ChatMessageDocument } from '../schemas/chat-message.schema';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatMessage.name) private chatModel: Model<ChatMessageDocument>,
    private readonly notificationsService: NotificationsService
  ) {}

  async saveMessage(data: any): Promise<ChatMessageDocument> {
    const newMessage = await new this.chatModel(data).save();
    
    if (data.senderType === 'USER') {
      await this.notificationsService.create({
        title: 'New Support Message',
        message: `You have a new message from ${data.userName}`,
        type: 'chat',
        link: `/admin/chat?room=${data.roomId}`
      });
    }
    
    return newMessage;
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
          attachments: { $first: '$attachments' },
          userName: { $first: '$userName' },
          userEmail: { $first: '$userEmail' },
          createdAt: { $first: '$createdAt' },
          unreadCount: {
            $sum: { $cond: [{ $and: [{ $eq: ['$isRead', false] }, { $eq: ['$senderType', 'USER'] }] }, 1, 0] },
          },
        },
      },
      { $addFields: { 
          displayMessage: { 
            $cond: [
              { $and: [{ $eq: ['$lastMessage', ''] }, { $gt: [{ $size: { $ifNull: ['$attachments', []] } }, 0] }] },
              '[Image]',
              '$lastMessage'
            ]
          }
        }
      },
      { $sort: { createdAt: -1 } },
    ]);
  }

  async markAsRead(roomId: string) {
    return this.chatModel.updateMany({ roomId, senderType: 'USER' }, { isRead: true }).exec();
  }
}
