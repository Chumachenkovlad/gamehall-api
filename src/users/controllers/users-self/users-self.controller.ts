import { Body, Controller, Get, Patch, UseGuards, UseInterceptors } from '@nestjs/common';

import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { Self } from '../../../common/decorators/self.decorator';
import { ErrorsInterceptor } from '../../../common/interceptors/errors.interceptor';
import { UserDto } from '../../dto/user.dto';
import { User } from '../../entities/user.entity';
import { UsersService } from '../../services/users.service';

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
