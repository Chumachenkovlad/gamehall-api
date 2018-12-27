import { Body, Controller, Get, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { ErrorsInterceptor, Self } from 'common';
import { UserDto } from 'users/dto/user.dto';
import { User } from 'users/entities/user.entity';
import { UsersService } from 'users/services/users.service';

@UseInterceptors(ErrorsInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('users/self')
export class UsersSelfController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findById(@Self() user: User): Promise<User> {
    return user;
  }

  @Patch() async updateOne(@Body() userDto: UserDto, @Self() user: User): Promise<User> {
    return this.usersService.update(user.id, userDto);
  }
}
