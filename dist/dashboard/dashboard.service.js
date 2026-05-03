"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("../schemas/order.schema");
const user_schema_1 = require("../schemas/user.schema");
const product_schema_1 = require("../schemas/product.schema");
let DashboardService = class DashboardService {
    orderModel;
    userModel;
    productModel;
    constructor(orderModel, userModel, productModel) {
        this.orderModel = orderModel;
        this.userModel = userModel;
        this.productModel = productModel;
    }
    async getStats() {
        const [totalRevenue, pendingOrders, totalCustomers, activeProducts, recentOrders,] = await Promise.all([
            this.orderModel.aggregate([
                { $match: { status: 'PAID' } },
                { $group: { _id: null, total: { $sum: '$totalAmount' } } },
            ]),
            this.orderModel.countDocuments({ status: 'PENDING' }),
            this.userModel.countDocuments({ role: 'USER' }),
            this.productModel.countDocuments({ isActive: true }),
            this.orderModel.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .populate('user', 'firstName lastName email')
                .exec(),
        ]);
        const revenueValue = totalRevenue[0]?.total || 0;
        return {
            stats: [
                { label: 'Total Revenue', value: `₦${revenueValue.toLocaleString()}`, trend: 15, icon: 'LucideDollarSign' },
                { label: 'Pending Orders', value: pendingOrders.toString(), trend: 5, icon: 'LucideShoppingBag' },
                { label: 'Total Customers', value: totalCustomers.toString(), trend: 8, icon: 'LucideUsers' },
                { label: 'Live Inventory', value: activeProducts.toString(), trend: 0, icon: 'LucideBox' },
            ],
            recentOrders: recentOrders.map(order => ({
                id: order._id,
                customer: order.shippingAddress.name || 'Guest User',
                date: this.formatRelativeTime(order.createdAt),
                amount: order.totalAmount,
                status: order.status
            })),
            revenueData: await this.getMonthlyRevenueData()
        };
    }
    async getMonthlyRevenueData() {
        const data = [];
        for (let i = 11; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            const monthlyTotal = await this.orderModel.aggregate([
                { $match: { status: 'PAID', createdAt: { $gte: startOfMonth, $lte: endOfMonth } } },
                { $group: { _id: null, total: { $sum: '$totalAmount' } } },
            ]);
            data.push(monthlyTotal[0]?.total || 0);
        }
        return data;
    }
    formatRelativeTime(date) {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (minutes < 1)
            return 'Just now';
        if (minutes < 60)
            return `${minutes}m ago`;
        if (hours < 24)
            return `${hours}h ago`;
        return `${days}d ago`;
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map