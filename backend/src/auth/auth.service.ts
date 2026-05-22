import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ApiResponse } from '../common/responses/api-response';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(dto: LoginDto) {
    const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@posts-manager.com';
    const adminPassword = process.env.ADMIN_PASSWORD ?? 'Admin1234!';

    if (dto.email !== adminEmail || dto.password !== adminPassword) {
      throw new UnauthorizedException('Credenciales invalidas.');
    }

    const payload = { sub: 'admin', email: dto.email };
    const token = this.jwtService.sign(payload);

    return ApiResponse.success(
      { token, expiresIn: process.env.JWT_EXPIRES_IN ?? '24h' },
      'Autenticacion exitosa.',
    );
  }
}
