import { BlogService } from './blog.service';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    seed(): Promise<any>;
    create(createBlogDto: any): Promise<import("../schemas/blog.schema").BlogDocument>;
    findAll(): Promise<import("../schemas/blog.schema").BlogDocument[]>;
    findBySlug(slug: string): Promise<import("../schemas/blog.schema").BlogDocument>;
    findOne(id: string): Promise<import("../schemas/blog.schema").BlogDocument>;
    update(id: string, updateData: any): Promise<import("../schemas/blog.schema").BlogDocument>;
    remove(id: string): Promise<any>;
    like(id: string): Promise<import("../schemas/blog.schema").BlogDocument>;
    addComment(id: string, commentData: any): Promise<import("../schemas/comment.schema").CommentDocument>;
    getComments(id: string): Promise<import("../schemas/comment.schema").CommentDocument[]>;
}
