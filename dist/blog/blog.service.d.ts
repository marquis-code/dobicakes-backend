import { Model } from 'mongoose';
import { BlogDocument } from '../schemas/blog.schema';
export declare class BlogService {
    private blogModel;
    constructor(blogModel: Model<BlogDocument>);
    create(blogData: any): Promise<BlogDocument>;
    findAll(): Promise<BlogDocument[]>;
    findOne(id: string): Promise<BlogDocument>;
    update(id: string, updateData: any): Promise<BlogDocument>;
    delete(id: string): Promise<any>;
}
