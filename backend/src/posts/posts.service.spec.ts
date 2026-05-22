import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './schemas/post.schema';

const mockPost = { _id: '507f1f77bcf86cd799439011', title: 'Test', body: 'Contenido de prueba', author: 'Autor' };

const mockPostModel = {
  find: jest.fn().mockReturnThis(),
  sort: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue([mockPost]),
  countDocuments: jest.fn().mockReturnThis(),
  create: jest.fn().mockResolvedValue(mockPost),
  findById: jest.fn().mockReturnThis(),
  findByIdAndUpdate: jest.fn().mockReturnThis(),
  findByIdAndDelete: jest.fn().mockReturnThis(),
  insertMany: jest.fn().mockResolvedValue([mockPost]),
};

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: getModelToken(Post.name), useValue: mockPostModel },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('findAll debe retornar publicaciones paginadas', async () => {
    mockPostModel.exec.mockResolvedValue([mockPost]);
    const result = await service.findAll({ page: 1, limit: 9 });
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
  });

  it('create debe crear una publicacion', async () => {
    const result = await service.create({ title: 'Test', body: 'Contenido de prueba unitaria', author: 'Autor' });
    expect(result.success).toBe(true);
  });

  it('bulkCreate debe lanzar error con arreglo vacio', async () => {
    await expect(service.bulkCreate([])).rejects.toThrow(BadRequestException);
  });

  it('findOne debe lanzar NotFoundException si no existe', async () => {
    mockPostModel.exec.mockResolvedValueOnce(null);
    await expect(service.findOne('id-inexistente')).rejects.toThrow(NotFoundException);
  });
});
