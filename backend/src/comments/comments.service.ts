import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiResponse } from '../common/responses/api-response';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async findByPost(postId: string) {
    const comments = await this.commentModel
      .find({ postId })
      .sort({ createdAt: -1 })
      .exec();
    return ApiResponse.success(comments, 'Comments retrieved successfully');
  }

  async create(dto: CreateCommentDto) {
    const created = await this.commentModel.create(dto);
    return ApiResponse.success(created, 'Comment created successfully');
  }

  async remove(id: string) {
    const deleted = await this.commentModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Comment with id "${id}" not found`);
    }
    return ApiResponse.success(null, 'Comment deleted successfully');
  }
}
