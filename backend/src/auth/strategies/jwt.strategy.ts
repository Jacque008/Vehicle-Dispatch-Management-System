import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

export interface JwtPayload {
  sub: string;
  email: string;
  type: 'manager' | 'driver';
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private prisma: PrismaService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    if (payload.type === 'manager') {
      const manager = await this.prisma.manager.findUnique({
        where: { id: payload.sub },
      });

      if (!manager) {
        throw new UnauthorizedException();
      }

      return { ...manager, userType: 'manager' };
    } else if (payload.type === 'driver') {
      const driver = await this.prisma.driver.findUnique({
        where: { id: payload.sub },
      });

      if (!driver) {
        throw new UnauthorizedException();
      }

      return { ...driver, userType: 'driver' };
    }

    throw new UnauthorizedException();
  }
}
