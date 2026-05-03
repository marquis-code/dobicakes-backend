import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from '../schemas/notification.schema';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<Notification>,
    private readonly gateway: NotificationsGateway
  ) {}

  async create(data: any) {
    const notification = await this.notificationModel.create(data);
    this.gateway.sendToAdmin('newNotification', notification);
    return notification;
  }

  async findByUser(userId: string) {
    return this.notificationModel.find({ user: userId }).sort({ createdAt: -1 }).exec();
  }

  async findAll() {
    return this.notificationModel.find().sort({ createdAt: -1 }).exec();
  }

  async markAsRead(id: string) {
    return this.notificationModel.findByIdAndUpdate(id, { isRead: true }, { new: true }).exec();
  }

  async markAllAsRead(userId?: string) {
    const filter: any = { isRead: false };
    if (userId && userId !== 'ADMIN') filter.user = userId;
    return this.notificationModel.updateMany(filter, { isRead: true }).exec();
  }

  async delete(id: string) {
    return this.notificationModel.findByIdAndDelete(id).exec();
  }
}
