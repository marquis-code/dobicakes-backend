import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Appointment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  customerEmail: string;

  @Prop({ required: true })
  customerPhone: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true, enum: ['Wedding Tasting', 'Birthday Consultation', 'Custom Order Discussion', 'General Enquiry'] })
  type: string;

  @Prop()
  notes: string;

  @Prop({ default: 'pending', enum: ['pending', 'confirmed', 'cancelled', 'completed'] })
  status: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
