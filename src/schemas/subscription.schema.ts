import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema({ timestamps: true })
export class Subscription {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  source?: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
