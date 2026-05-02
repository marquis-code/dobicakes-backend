import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enquiry } from '../schemas/enquiry.schema';

@Injectable()
export class EnquiriesService {
  constructor(@InjectModel(Enquiry.name) private enquiryModel: Model<Enquiry>) {}

  async create(data: any) {
    return this.enquiryModel.create(data);
  }

  async findAll() {
    return this.enquiryModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string) {
    return this.enquiryModel.findById(id).exec();
  }

  async markAsRead(id: string) {
    return this.enquiryModel.findByIdAndUpdate(id, { status: 'read' }, { new: true }).exec();
  }

  async reply(id: string, adminReply: string) {
    return this.enquiryModel.findByIdAndUpdate(id, { adminReply, status: 'replied' }, { new: true }).exec();
  }

  async delete(id: string) {
    return this.enquiryModel.findByIdAndDelete(id).exec();
  }
}
