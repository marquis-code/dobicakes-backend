import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: any): Promise<import("../schemas/product.schema").ProductDocument>;
    findAll(query: any): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateProductDto: any): Promise<import("../schemas/product.schema").ProductDocument>;
    remove(id: string): Promise<void>;
}
