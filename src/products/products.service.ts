import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { paginate } from '../shared/utils/pagination';

const PRODUCTS_CACHE_KEY = 'products:all';
const PRODUCT_CACHE_PREFIX = 'products:';
const CACHE_TTL = 300; // 5 minutes

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(productData: any): Promise<ProductDocument> {
    const product = new this.productModel(productData);
    const saved = await product.save();
    return saved;
  }

  async findAll(query: any = {}): Promise<any> {
    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '12');
    const cacheKey = `${PRODUCTS_CACHE_KEY}:${page}:${limit}:${JSON.stringify(query)}`;
    
    // Try cache first
    try {
      const cached = await this.cacheManager.get(cacheKey);
      if (cached) return cached;
    } catch (e) {
      console.warn('Cache lookup failed:', e.message);
    }

    const filter: any = { isAvailable: true };
    if (query.category && query.category !== 'All') filter.category = query.category;
    if (query.availabilityType && query.availabilityType !== 'all') filter.availabilityType = query.availabilityType;

    const sortMap: any = {
      'price_low': { price: 1 },
      'price_high': { price: -1 },
      'latest': { createdAt: -1 },
      'name': { name: 1 }
    };
    const sort = sortMap[query.sort] || { createdAt: -1 };

    const result = await paginate<ProductDocument>(this.productModel, filter, page, limit, sort);
    
    // Save to cache
    try {
      await this.cacheManager.set(cacheKey, result, CACHE_TTL);
    } catch (e) {
      console.warn('Cache save failed:', e.message);
    }

    return result;
  }

  async findOne(id: string): Promise<any> {
    const cacheKey = `${PRODUCT_CACHE_PREFIX}${id}`;
    
    try {
      const cached = await this.cacheManager.get(cacheKey);
      if (cached) return cached;
    } catch (e) {
      console.warn('Cache lookup failed for product:', id, e.message);
    }

    const product = await this.productModel.findById(id).lean().exec();
    if (!product) throw new NotFoundException('Product not found');
    
    try {
      await this.cacheManager.set(cacheKey, product, CACHE_TTL);
    } catch (e) {
      console.warn('Cache save failed for product:', id, e.message);
    }
    
    return product;
  }

  async update(id: string, updateData: any): Promise<ProductDocument> {
    const product = await this.productModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Product not found');
  }

  async updateStock(id: string, quantity: number): Promise<void> {
    await this.productModel.findByIdAndUpdate(id, { $inc: { stock: quantity } }).exec();
  }
}
