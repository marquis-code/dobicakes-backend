import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Form, FormDocument } from '../schemas/form.schema';

@Injectable()
export class FormsService {
  constructor(@InjectModel(Form.name) private formModel: Model<FormDocument>) {}

  async create(formData: any): Promise<FormDocument> {
    const form = new this.formModel(formData);
    return form.save();
  }

  async findAll(): Promise<FormDocument[]> {
    return this.formModel.find().exec();
  }

  async findOne(id: string): Promise<FormDocument> {
    const form = await this.formModel.findById(id).exec();
    if (!form) throw new NotFoundException('Form not found');
    return form;
  }

  async submitResponse(id: string, responseData: any): Promise<FormDocument> {
    const form = await this.findOne(id);
    form.responses.push({
      submittedAt: new Date(),
      data: responseData,
    });
    return form.save();
  }

  async delete(id: string): Promise<any> {
    return this.formModel.findByIdAndDelete(id).exec();
  }
}
