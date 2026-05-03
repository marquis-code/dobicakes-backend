import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class AppointmentProduct extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, default: 60 })
  duration: number; // in minutes

  @Prop({ required: true, type: Object })
  availability: {
    days: string[]; // ['monday', 'tuesday', ...]
    startTime: string; // '09:00'
    endTime: string; // '17:00'
  };

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  image: string;
}

export const AppointmentProductSchema = SchemaFactory.createForClass(AppointmentProduct);
