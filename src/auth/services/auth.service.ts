import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from '../interfaces/jwt-payload.interface';

// TODO
// import { UsersService } from '../users/users.service';
@Injectable()
export class AuthService {
  constructor(
    // TODO
    // private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(): Promise<string> {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    const user: JwtPayload = { email: 'user@email.com' };
    return this.jwtService.sign(user);
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // TODO
    // return await this.usersService.findOneByEmail(payload.email);
  }
}
