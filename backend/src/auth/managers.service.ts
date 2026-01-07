import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

@Injectable()
export class ManagersService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async createManager(email: string, password: string, name: string) {
    const existing = await this.prisma.manager.findUnique({
      where: { email },
    });

    if (existing) {
      throw new ConflictException('Manager with this email already exists');
    }

    const passwordHash = await this.authService.hashPassword(password);

    return this.prisma.manager.create({
      data: {
        email,
        passwordHash,
        name,
      },
    });
  }
}
