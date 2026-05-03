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

  async update(id: string, updateData: any): Promise<FormDocument> {
    const form = await this.formModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!form) throw new NotFoundException('Form not found');
    return form;
  }

  async delete(id: string): Promise<any> {
    return this.formModel.findByIdAndDelete(id).exec();
  }

  async seedForms(): Promise<any> {
    const seedData = [
      {
        title: 'General Contact Form',
        description: 'Primary enquiry point for general questions and feedback.',
        fields: [
          { label: 'Full Name', type: 'text', required: true },
          { label: 'Email Address', type: 'email', required: true },
          { label: 'Subject', type: 'text', required: false },
          { label: 'Message', type: 'textarea', required: true }
        ],
        isActive: true,
        responses: []
      },
      {
        title: 'Bespoke Tasting Session',
        description: 'Booking form for exclusive wedding cake tasting experiences.',
        fields: [
          { label: 'Name', type: 'text', required: true },
          { label: 'Proposed Wedding Date', type: 'text', required: true },
          { label: 'Number of Guests', type: 'number', required: true },
          { label: 'Dietary Requirements', type: 'textarea', required: false },
          { label: 'Flavour Preferences', type: 'select', required: true, options: ['Classic Vanilla', 'Nigerian Red Velvet', 'Sicilian Lemon', 'Dark Ganache'] }
        ],
        isActive: true,
        responses: []
      },
      {
        title: 'Corporate Catering Request',
        description: 'Large-scale order management for corporate events and launches.',
        fields: [
          { label: 'Company Name', type: 'text', required: true },
          { label: 'Contact Person', type: 'text', required: true },
          { label: 'Event Date', type: 'text', required: true },
          { label: 'Volume Estimate', type: 'number', required: true },
          { label: 'Event Type', type: 'select', required: true, options: ['Product Launch', 'Board Meeting', 'Office Party', 'Client Gifting'] }
        ],
        isActive: true,
        responses: []
      }
    ];

    for (const form of seedData) {
      await this.formModel.findOneAndUpdate({ title: form.title }, form, { upsert: true, new: true });
    }

    return { message: 'Form seeding complete', count: seedData.length };
  }
}
