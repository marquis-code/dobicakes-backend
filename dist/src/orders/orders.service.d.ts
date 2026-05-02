import { Model } from 'mongoose';
import { OrderDocument } from '../schemas/order.schema';
import { PaystackService } from '../shared/services/paystack.service';
import { ResendService } from '../shared/services/resend.service';
import { ProductsService } from '../products/products.service';
export declare class OrdersService {
    private orderModel;
    private paystackService;
    private resendService;
    private productsService;
    constructor(orderModel: Model<OrderDocument>, paystackService: PaystackService, resendService: ResendService, productsService: ProductsService);
    create(orderData: any): Promise<any>;
    verifyPayment(reference: string): Promise<OrderDocument>;
    findOne(id: string): Promise<OrderDocument>;
    findByUser(userId: string): Promise<OrderDocument[]>;
    findAll(): Promise<OrderDocument[]>;
    updateStatus(id: string, status: string): Promise<OrderDocument>;
    private buildConfirmationEmail;
}
