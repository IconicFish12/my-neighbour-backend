import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DatabaseService } from '../../../database/database.service';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
  sub: string; // user ID
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    private prisma: DatabaseService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || '',
    });
  }
  async validate(payload: JwtPayload) {
    const user = await this.prisma.users.findUnique({
      where: { id: payload.sub },
      include: {
        Resident: {
          include: {
            unit: true,
          },
        },
        Employee: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.emailVerificationToken !== null) {
      throw new UnauthorizedException('Email not verified');
    }

    if (!user.sessionToken) {
      throw new UnauthorizedException('Session expired. Please login again.');
    }

    return {
      sub: user.id,
      username: user.username,
      email: user.primaryEmail,
      fullName: user.fullName,
      role: user.role,
      resident: user.Resident,
    };
  }
}
