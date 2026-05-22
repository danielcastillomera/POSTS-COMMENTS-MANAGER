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
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async findAll(pagination: PaginationDto) {
    const page = pagination.page ?? 1;
    const limit = pagination.limit ?? 9;
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      this.postModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      this.postModel.countDocuments().exec(),
    ]);

    return ApiResponse.paginated(posts, total, page, limit);
  }

  async findOne(id: string) {
    const post = await this.postModel.findById(id).exec();
    if (!post) throw new NotFoundException(`Publicación con id "${id}" no encontrada.`);
    return ApiResponse.success(post, 'Publicación obtenida correctamente.');
  }

  async create(dto: CreatePostDto) {
    const created = await this.postModel.create(dto);
    return ApiResponse.success(created, 'Publicación creada correctamente.');
  }

  async update(id: string, dto: UpdatePostDto) {
    const updated = await this.postModel
      .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
      .exec();
    if (!updated) throw new NotFoundException(`Publicación con id "${id}" no encontrada.`);
    return ApiResponse.success(updated, 'Publicación actualizada correctamente.');
  }

  async remove(id: string) {
    const deleted = await this.postModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Publicación con id "${id}" no encontrada.`);
    return ApiResponse.success(null, 'Publicación eliminada correctamente.');
  }

  async bulkCreate(dtos: CreatePostDto[]) {
    if (!Array.isArray(dtos) || dtos.length === 0) {
      throw new BadRequestException('El cuerpo debe ser un arreglo no vacío.');
    }
    const result = await this.postModel.insertMany(dtos, { ordered: false });
    return ApiResponse.bulk(result.length, dtos.length);
  }
}
