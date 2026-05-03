import { Model } from 'mongoose';
import { OrderDocument } from '../schemas/order.schema';
import { UserDocument } from '../schemas/user.schema';
import { ProductDocument } from '../schemas/product.schema';
export declare class DashboardService {
    private orderModel;
    private userModel;
    private productModel;
    constructor(orderModel: Model<OrderDocument>, userModel: Model<UserDocument>, productModel: Model<ProductDocument>);
    getStats(): Promise<{
        stats: {
            label: string;
            value: string;
            trend: number;
            icon: string;
        }[];
        recentOrders: {
            id: import("mongoose").Types.ObjectId;
            customer: string;
            date: string;
            amount: number;
            status: "PENDING" | "PROCESSING" | "PAID" | "DELIVERED" | "CANCELLED";
        }[];
        revenueData: any[];
    }>;
    private getMonthlyRevenueData;
    private formatRelativeTime;
}
