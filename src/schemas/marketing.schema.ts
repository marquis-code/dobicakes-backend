import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PromoDocument = Promo & Document;

@Schema({ timestamps: true })
export class Promo {
  @Prop({ required: true, unique: true, index: true })
  code: string;

  @Prop({ required: true, enum: ['percentage', 'fixed'] })
  discountType: string;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  expiryDate: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  usageLimit: number;

  @Prop({ default: 0 })
  usageCount: number;
}

export const PromoSchema = SchemaFactory.createForClass(Promo);

export type BannerDocument = Banner & Document;

@Schema({ timestamps: true })
export class Banner {
  @Prop({ required: true })
  imageUrl: string;

  @Prop({ default: '#' })
  link: string;

  @Prop()
  title: string;

  @Prop()
  subtitle: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: 0 })
  order: number;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);

export type EmailTemplateDocument = EmailTemplate & Document;

@Schema({ timestamps: true })
export class EmailTemplate {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  htmlContent: string;
}

export const EmailTemplateSchema = SchemaFactory.createForClass(EmailTemplate);

export type EmailCampaignDocument = EmailCampaign & Document;

@Schema({ timestamps: true })
export class EmailCampaign {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, ref: 'EmailTemplate' })
  templateId: string;

  @Prop({ default: 'draft', enum: ['draft', 'sending', 'sent', 'failed'] })
  status: string;

  @Prop()
  sentAt: Date;

  @Prop({ default: 0 })
  recipientsCount: number;
}

export const EmailCampaignSchema = SchemaFactory.createForClass(EmailCampaign);
