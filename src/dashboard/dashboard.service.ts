import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { Product, ProductDocument } from '../schemas/product.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getStats() {
    const [
      totalRevenue,
      pendingOrders,
      totalCustomers,
      activeProducts,
      recentOrders,
    ] = await Promise.all([
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

    // Calculate revenue trend (mocked for now or could be calculated from dates)
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

  private async getMonthlyRevenueData() {
    // Generate last 12 months revenue data
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

  private formatRelativeTime(date: Date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }
}
