import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiResponse } from '../common/responses/api-response';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async findAll() {
    const posts = await this.postModel.find().sort({ createdAt: -1 }).exec();
    return ApiResponse.success(posts, 'Posts retrieved successfully');
  }

  async findOne(id: string) {
    const post = await this.postModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException(`Post with id "${id}" not found`);
    }
    return ApiResponse.success(post, 'Post retrieved successfully');
  }

  async create(dto: CreatePostDto) {
    const created = await this.postModel.create(dto);
    return ApiResponse.success(created, 'Post created successfully');
  }

  async update(id: string, dto: UpdatePostDto) {
    const updated = await this.postModel
      .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Post with id "${id}" not found`);
    }
    return ApiResponse.success(updated, 'Post updated successfully');
  }

  async remove(id: string) {
    const deleted = await this.postModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Post with id "${id}" not found`);
    }
    return ApiResponse.success(null, 'Post deleted successfully');
  }

  async bulkCreate(dtos: CreatePostDto[]) {
    if (!Array.isArray(dtos) || dtos.length === 0) {
      throw new BadRequestException('Request body must be a non-empty array');
    }
    const result = await this.postModel.insertMany(dtos, { ordered: false });
    return ApiResponse.bulk(result.length, dtos.length);
  }
}
