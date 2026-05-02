import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from '../schemas/blog.schema';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async create(blogData: any): Promise<BlogDocument> {
    const blog = new this.blogModel(blogData);
    return blog.save();
  }

  async findAll(): Promise<BlogDocument[]> {
    return this.blogModel.find({ isPublished: true }).exec();
  }

  async findOne(id: string): Promise<BlogDocument> {
    const blog = await this.blogModel.findById(id).exec();
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  async update(id: string, updateData: any): Promise<BlogDocument> {
    const blog = await this.blogModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  async delete(id: string): Promise<any> {
    return this.blogModel.findByIdAndDelete(id).exec();
  }
}
