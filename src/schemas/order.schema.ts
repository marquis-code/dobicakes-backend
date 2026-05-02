import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: false, index: true })
  user?: Types.ObjectId;

  @Prop([{
    product: { type: Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    customization: {
      flavor: String,
      size: String,
      filling: String,
      customMessage: String
    }
  }])
  items: any[];

  @Prop({ required: true, type: Number })
  totalAmount: number;

  @Prop({ default: 'PENDING' })
  status: 'PENDING' | 'PROCESSING' | 'PAID' | 'DELIVERED' | 'CANCELLED';

  @Prop({ required: true })
  paymentMethod: 'PAYSTACK' | 'BANK_TRANSFER';

  @Prop()
  paymentReference?: string;

  @Prop()
  paymentProofUrl?: string;

  @Prop({ type: Object, required: true })
  shippingAddress: {
    name?: string;
    email?: string;
    address: string;
    city: string;
    state: string;
    phone: string;
  };

  @Prop({ type: Object })
  virtualAccount?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
}

export const OrderSchema = SchemaFactory.createForClass(Order);
