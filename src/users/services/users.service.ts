import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BaseResponse } from 'common';
import { ConfigService } from 'config/config.service';
import { Sequelize } from 'sequelize-typescript';
import { USER_ATTRIBUTES, UserErrors, UsersRepository } from 'users/constants';
import { UserDto } from 'users/dto/user.dto';
import { User } from 'users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepository) private readonly usersRepository: typeof User,
    @Inject('Sequelize') private readonly sequelize: Sequelize,
    private readonly configService: ConfigService
  ) {}

  async create(userDto: UserDto): Promise<User> {
    return await User.create(userDto, { raw: true });
  }

  async update(id: number, userDto: UserDto): Promise<User> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException(UserErrors.USER_NOT_FOUND);
    }

    await this.sequelize.transaction(async transaction => {
      await user.set(userDto).save({ transaction });
    });

    return await this.findById(id);
  }

  async findById(id: number): Promise<User> {
    return await this.usersRepository.findById(id, {
      attributes: USER_ATTRIBUTES
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<BaseResponse<User>> {
    return await this.usersRepository.findAndCountAll({
      attributes: USER_ATTRIBUTES,
      raw: true
    });
  }
}
