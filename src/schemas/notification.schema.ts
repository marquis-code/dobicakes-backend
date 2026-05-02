import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Notification extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true, enum: ['order', 'payment', 'appointment', 'system', 'chat'] })
  type: string;

  @Prop({ default: false })
  isRead: boolean;

  @Prop()
  link: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
