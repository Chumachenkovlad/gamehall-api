import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BaseResponse } from 'common';
import { Self } from 'common/decorators/self.decorator';
import { UserDto } from 'users/dto/user.dto';
import { User } from 'users/entities/user.entity';
import { UsersService } from 'users/services/users.service';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() async findAll(): Promise<BaseResponse<User>> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    return await this.usersService.findById(id);
  }

  @Post() async createOne(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.create(userDto);
  }

  @Patch(':id') async updateOne(@Self() user: User, @Body() userDto: UserDto): Promise<User> {
    return this.usersService.update(user.id, userDto);
  }
}
