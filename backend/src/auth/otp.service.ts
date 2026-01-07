import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from './email.service';

@Injectable()
export class OtpService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private configService: ConfigService,
  ) {}

  private generateOtpCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendOtp(email: string): Promise<{ success: boolean; message: string }> {
    // Invalidate any existing unverified OTPs for this email
    await this.prisma.otpCode.deleteMany({
      where: {
        email,
        verified: false,
      },
    });

    // Generate new OTP
    const code = this.generateOtpCode();
    const expiresInMinutes = parseInt(
      this.configService.get('OTP_EXPIRES_IN_MINUTES', '10'),
    );
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + expiresInMinutes);

    // Save OTP to database
    await this.prisma.otpCode.create({
      data: {
        email,
        code,
        expiresAt,
      },
    });

    // Send email
    await this.emailService.sendOtpEmail(email, code);

    return {
      success: true,
      message: 'OTP sent to your email',
    };
  }

  async verifyOtp(email: string, code: string): Promise<string> {
    const otpRecord = await this.prisma.otpCode.findFirst({
      where: {
        email,
        code,
        verified: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!otpRecord) {
      throw new BadRequestException('Invalid OTP code');
    }

    if (new Date() > otpRecord.expiresAt) {
      throw new BadRequestException('OTP code has expired');
    }

    // Mark as verified
    await this.prisma.otpCode.update({
      where: { id: otpRecord.id },
      data: { verified: true },
    });

    return email;
  }
}
