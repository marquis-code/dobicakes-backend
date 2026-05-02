import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  password?: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ default: 'CUSTOMER', type: String, enum: ['ADMIN', 'CUSTOMER'] })
  role: 'ADMIN' | 'CUSTOMER';

  @Prop()
  firebaseUid?: string;

  @Prop()
  phone?: string;

  @Prop()
  avatar?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: String, required: false })
  resetPasswordToken?: string | null;

  @Prop({ type: Date, required: false })
  resetPasswordExpires?: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
