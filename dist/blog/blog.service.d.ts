import { Model } from 'mongoose';
import { BlogDocument } from '../schemas/blog.schema';
import { CommentDocument } from '../schemas/comment.schema';
export declare class BlogService {
    private blogModel;
    private commentModel;
    constructor(blogModel: Model<BlogDocument>, commentModel: Model<CommentDocument>);
    private generateSlug;
    create(blogData: any): Promise<BlogDocument>;
    findAll(): Promise<BlogDocument[]>;
    findBySlug(slug: string): Promise<BlogDocument>;
    findOne(id: string): Promise<BlogDocument>;
    update(id: string, updateData: any): Promise<BlogDocument>;
    delete(id: string): Promise<any>;
    like(id: string): Promise<BlogDocument>;
    addComment(blogId: string, commentData: any): Promise<CommentDocument>;
    getComments(blogId: string): Promise<CommentDocument[]>;
    seedBlogs(): Promise<any>;
}
