import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, type: Number, default: 0 })
  stock: number;

  @Prop({ required: true, index: true })
  category: string;

  @Prop({ type: [String] })
  images: string[];

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ type: [String], default: [] })
  flavors: string[];

  @Prop({ type: [{ name: String, priceOffset: Number }], default: [] })
  sizes: { name: string; priceOffset: number }[];

  @Prop({ type: [String], default: [] })
  fillings: string[];

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ 
    type: String, 
    enum: ['NOW', 'PREORDER'], 
    default: 'NOW',
    required: true 
  })
  availabilityType: 'NOW' | 'PREORDER';

  @Prop({ type: Object })
  metadata: Record<string, any>;

  createdAt: Date;
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
