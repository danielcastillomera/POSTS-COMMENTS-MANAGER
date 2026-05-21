import { IsString, IsOptional, MinLength } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  title?: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  body?: string;

  @IsString()
  @IsOptional()
  author?: string;
}
