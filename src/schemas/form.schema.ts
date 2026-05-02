import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FormDocument = Form & Document;

@Schema({ timestamps: true })
export class Form {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [Object], required: true })
  fields: Array<{
    label: string;
    type: 'text' | 'number' | 'email' | 'select' | 'textarea';
    required: boolean;
    options?: string[];
  }>;

  @Prop({ type: [Object], default: [] })
  responses: Array<{
    submittedAt: Date;
    data: Record<string, any>;
  }>;

  @Prop({ default: true })
  isActive: boolean;
}

export const FormSchema = SchemaFactory.createForClass(Form);
