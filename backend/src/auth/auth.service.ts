import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateManager(email: string, password: string) {
    const manager = await this.prisma.manager.findUnique({
      where: { email },
    });

    if (!manager) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, manager.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return manager;
  }

  async managerLogin(email: string, password: string) {
    const manager = await this.validateManager(email, password);

    const payload = {
      sub: manager.id,
      email: manager.email,
      type: 'manager',
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: manager.id,
        email: manager.email,
        name: manager.name,
      },
    };
  }

  async driverLogin(driverId: string) {
    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
    });

    if (!driver) {
      throw new UnauthorizedException('Driver not found');
    }

    const payload = {
      sub: driver.id,
      email: driver.email,
      type: 'driver',
    };

    return {
      accessToken: this.jwtService.sign(payload),
      driver: {
        id: driver.id,
        email: driver.email,
        name: driver.name,
        phone: driver.phone,
        status: driver.status,
      },
    };
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
