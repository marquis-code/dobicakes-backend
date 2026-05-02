import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment } from '../schemas/appointment.schema';

@Injectable()
export class AppointmentsService {
  constructor(@InjectModel(Appointment.name) private appointmentModel: Model<Appointment>) {}

  async create(data: any) {
    return this.appointmentModel.create(data);
  }

  async findAll() {
    return this.appointmentModel.find().sort({ date: 1 }).exec();
  }

  async findOne(id: string) {
    return this.appointmentModel.findById(id).exec();
  }

  async findByUser(userId: string) {
    return this.appointmentModel.find({ user: userId }).sort({ date: -1 }).exec();
  }

  async updateStatus(id: string, status: string) {
    return this.appointmentModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  async delete(id: string) {
    return this.appointmentModel.findByIdAndDelete(id).exec();
  }
}
