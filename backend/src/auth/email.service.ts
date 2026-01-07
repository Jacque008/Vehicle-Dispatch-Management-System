import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private resend: Resend;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get('RESEND_API_KEY');
    if (apiKey) {
      this.resend = new Resend(apiKey);
    } else {
      this.logger.warn('RESEND_API_KEY not configured, emails will be logged to console');
    }
  }

  async sendOtpEmail(email: string, code: string): Promise<void> {
    const subject = 'Your Verification Code';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Vehicle Dispatch - Verification Code</h2>
        <p>Your verification code is:</p>
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
          ${code}
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
        <p style="color: #999; font-size: 12px;">Vehicle Dispatch System</p>
      </div>
    `;

    // If Resend is not configured, log to console
    if (!this.resend) {
      this.logger.log(`
========================================
EMAIL (Development Mode)
To: ${email}
Subject: ${subject}
OTP CODE: ${code}
========================================
      `);
      return;
    }

    try {
      await this.resend.emails.send({
        from: 'Vehicle Dispatch <onboarding@resend.dev>',
        to: email,
        subject,
        html,
      });
      this.logger.log(`OTP email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send OTP email to ${email}`, error);
      throw new Error('Failed to send OTP email');
    }
  }
}
