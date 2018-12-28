import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '../config/config.service';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.jwtSecret
    });
  }

  async validate(payload: JwtPayload, done: any) {
    const user = await this.authService.validate(payload);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }

    done(null, user);
  }
}
