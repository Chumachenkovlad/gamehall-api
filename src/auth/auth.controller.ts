import { Body, Controller, Post } from '@nestjs/common';

import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/services/users.service';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthPayload } from './interfaces/auth-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post('sign-in')
  async authenticate(@Body() authDto: AuthDto): Promise<AuthPayload> {
    const { email, password } = authDto;
    return await this.authService.login(email, password);
  }

  @Post('sign-up')
  async register(@Body() userDto: UserDto): Promise<AuthPayload> {
    const user = await this.usersService.create(userDto);

    return this.authService.createToken(user.id);
  }
}
