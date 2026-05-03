import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
}
