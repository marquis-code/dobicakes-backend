import { Model } from 'mongoose';
import { ProductDocument } from '../schemas/product.schema';
import type { Cache } from 'cache-manager';
export declare class ProductsService {
    private productModel;
    private cacheManager;
    constructor(productModel: Model<ProductDocument>, cacheManager: Cache);
    create(productData: any): Promise<ProductDocument>;
    findAll(query?: any): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateData: any): Promise<ProductDocument>;
    remove(id: string): Promise<void>;
    updateStock(id: string, quantity: number): Promise<void>;
}
