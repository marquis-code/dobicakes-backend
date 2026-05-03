import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Blog', required: true })
  blogId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  authorName: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: true })
  isApproved: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
