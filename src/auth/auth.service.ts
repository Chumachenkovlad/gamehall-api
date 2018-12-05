import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from 'config/config.service';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { User } from 'users/entities/user.entity';
import { UsersService } from 'users/services/users.service';

import { AuthPayload } from './interfaces/auth-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {}

  async login(email: string, password: string): Promise<AuthPayload> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException();
    }

    if (!user.authenticate(password)) {
      throw new BadRequestException();
    }

    return this.createToken(user.id);
  }

  async validate({ id }): Promise<User> {
    return await this.usersService.findById(id);
  }

  createToken(id: number): AuthPayload {
    const expires = moment()
      .add(this.configService.tokenExpirationTime, 's')
      .toISOString();

    const token = jwt.sign({ id }, this.configService.jwtSecret, {
      expiresIn: this.configService.tokenExpirationTime
    });

    return { token, expires };
  }
}
