import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
export declare class CategoriesService {
    private categoryModel;
    constructor(categoryModel: Model<CategoryDocument>);
    create(createDto: any): Promise<Category>;
    findAll(): Promise<Category[]>;
    update(id: string, updateDto: any): Promise<Category>;
    remove(id: string): Promise<any>;
}
