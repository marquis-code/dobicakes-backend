import { OrdersService } from './orders.service';
import { PaystackService } from '../shared/services/paystack.service';
export declare class OrdersController {
    private readonly ordersService;
    private readonly paystackService;
    constructor(ordersService: OrdersService, paystackService: PaystackService);
    create(createOrderDto: any, req: any): Promise<any>;
    verifyPayment(reference: string): Promise<import("../schemas/order.schema").OrderDocument>;
    handlePaystackWebhook(body: any, signature: string, req: any): Promise<{
        status: string;
    }>;
    checkPaymentStatus(orderId: string): Promise<any>;
    findMyOrders(req: any): Promise<import("../schemas/order.schema").OrderDocument[]>;
    findAll(): Promise<import("../schemas/order.schema").OrderDocument[]>;
    findOne(id: string): Promise<import("../schemas/order.schema").OrderDocument>;
    updateStatus(id: string, status: string): Promise<import("../schemas/order.schema").OrderDocument>;
    update(id: string, updateData: any): Promise<import("../schemas/order.schema").OrderDocument>;
}
