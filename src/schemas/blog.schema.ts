import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  summary: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  author: string;

  @Prop({ default: [] })
  tags: string[];

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: 0 })
  readingTime: number;

  @Prop({ default: true })
  isPublished: boolean;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
