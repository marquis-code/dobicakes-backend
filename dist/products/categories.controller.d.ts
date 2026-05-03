import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createDto: any): Promise<import("../schemas/category.schema").Category>;
    findAll(): Promise<import("../schemas/category.schema").Category[]>;
    update(id: string, updateDto: any): Promise<import("../schemas/category.schema").Category>;
    remove(id: string): Promise<any>;
}
