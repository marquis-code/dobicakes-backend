import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Appointment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AppointmentProduct', required: true })
  product: Types.ObjectId;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  customerEmail: string;

  @Prop({ required: true })
  customerPhone: string;

  @Prop({ required: true })
  scheduledAt: Date; // Full date and time

  @Prop()
  notes: string;

  @Prop({ default: 'pending', enum: ['pending', 'confirmed', 'cancelled', 'completed'] })
  status: string;

  @Prop({ required: true, default: 0 })
  price: number;

  @Prop({ default: 'unpaid', enum: ['unpaid', 'paid', 'refunded'] })
  paymentStatus: string;

  @Prop()
  paymentReference: string;

  @Prop()
  googleMeetLink: string;

  @Prop()
  googleCalendarEventId: string;

  @Prop({ default: 60 }) // duration in minutes inherited from product at time of booking
  duration: number;

  @Prop({ default: false })
  reminderSent: boolean;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
