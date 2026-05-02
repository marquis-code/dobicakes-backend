import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from '../schemas/notification.schema';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notification.name) private notificationModel: Model<Notification>) {}

  async create(data: any) {
    return this.notificationModel.create(data);
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

  async markAllAsRead(userId: string) {
    return this.notificationModel.updateMany({ user: userId, isRead: false }, { isRead: true }).exec();
  }

  async delete(id: string) {
    return this.notificationModel.findByIdAndDelete(id).exec();
  }
}
