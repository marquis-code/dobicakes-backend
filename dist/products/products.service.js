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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("../schemas/product.schema");
const cache_manager_1 = require("@nestjs/cache-manager");
const pagination_1 = require("../shared/utils/pagination");
const PRODUCTS_CACHE_KEY = 'products:all';
const PRODUCT_CACHE_PREFIX = 'products:';
const CACHE_TTL = 300;
let ProductsService = class ProductsService {
    productModel;
    cacheManager;
    constructor(productModel, cacheManager) {
        this.productModel = productModel;
        this.cacheManager = cacheManager;
    }
    async create(productData) {
        const product = new this.productModel(productData);
        const saved = await product.save();
        return saved;
    }
    async findAll(query = {}) {
        const page = parseInt(query.page || '1');
        const limit = parseInt(query.limit || '12');
        const cacheKey = `${PRODUCTS_CACHE_KEY}:${page}:${limit}:${JSON.stringify(query)}`;
        try {
            const cached = await this.cacheManager.get(cacheKey);
            if (cached)
                return cached;
        }
        catch (e) {
            console.warn('Cache lookup failed:', e.message);
        }
        const filter = { isAvailable: true };
        if (query.category && query.category !== 'All')
            filter.category = query.category;
        if (query.availabilityType && query.availabilityType !== 'all')
            filter.availabilityType = query.availabilityType;
        const sortMap = {
            'price_low': { price: 1 },
            'price_high': { price: -1 },
            'latest': { createdAt: -1 },
            'name': { name: 1 }
        };
        const sort = sortMap[query.sort] || { createdAt: -1 };
        const result = await (0, pagination_1.paginate)(this.productModel, filter, page, limit, sort);
        try {
            await this.cacheManager.set(cacheKey, result, CACHE_TTL);
        }
        catch (e) {
            console.warn('Cache save failed:', e.message);
        }
        return result;
    }
    async findOne(id) {
        const cacheKey = `${PRODUCT_CACHE_PREFIX}${id}`;
        try {
            const cached = await this.cacheManager.get(cacheKey);
            if (cached)
                return cached;
        }
        catch (e) {
            console.warn('Cache lookup failed for product:', id, e.message);
        }
        const product = await this.productModel.findById(id).lean().exec();
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        try {
            await this.cacheManager.set(cacheKey, product, CACHE_TTL);
        }
        catch (e) {
            console.warn('Cache save failed for product:', id, e.message);
        }
        return product;
    }
    async update(id, updateData) {
        const product = await this.productModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async remove(id) {
        const result = await this.productModel.findByIdAndDelete(id).exec();
        if (!result)
            throw new common_1.NotFoundException('Product not found');
    }
    async updateStock(id, quantity) {
        await this.productModel.findByIdAndUpdate(id, { $inc: { stock: quantity } }).exec();
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [mongoose_2.Model, Object])
], ProductsService);
//# sourceMappingURL=products.service.js.map