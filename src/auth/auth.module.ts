import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './services/auth.service';

// Both expiration time and secretKey are hardcoded (in a real-world
// application you should rather consider using environment variables).
// TODO replace secretKey and expiresIn with env

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600
      }
    })
  ],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
