import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DriverStatus } from '@prisma/client';

@Injectable()
export class DriversService {
  constructor(private prisma: PrismaService) {}

  async registerDriver(email: string, phone: string, name: string) {
    const existingEmail = await this.prisma.driver.findUnique({
      where: { email },
    });

    if (existingEmail) {
      throw new ConflictException('Driver with this email already exists');
    }

    const existingPhone = await this.prisma.driver.findUnique({
      where: { phone },
    });

    if (existingPhone) {
      throw new ConflictException('Driver with this phone already exists');
    }

    return this.prisma.driver.create({
      data: {
        email,
        phone,
        name,
        status: DriverStatus.applied,
      },
    });
  }

  async findById(id: string) {
    const driver = await this.prisma.driver.findUnique({
      where: { id },
    });

    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    return driver;
  }

  async findByEmail(email: string) {
    return this.prisma.driver.findUnique({
      where: { email },
    });
  }

  async listAll(status?: DriverStatus) {
    return this.prisma.driver.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: DriverStatus) {
    return this.prisma.driver.update({
      where: { id },
      data: { status },
    });
  }
}
