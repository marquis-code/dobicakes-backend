import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: any, req: any): Promise<any>;
    verifyPayment(reference: string): Promise<import("../schemas/order.schema").OrderDocument>;
    findMyOrders(req: any): Promise<import("../schemas/order.schema").OrderDocument[]>;
    findAll(): Promise<import("../schemas/order.schema").OrderDocument[]>;
    findOne(id: string): Promise<import("../schemas/order.schema").OrderDocument>;
    updateStatus(id: string, status: string): Promise<import("../schemas/order.schema").OrderDocument>;
}
