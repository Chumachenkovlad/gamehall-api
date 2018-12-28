import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

import { BaseResponse } from '../../common/interfaces/base-response.interface';
import { USER_ATTRIBUTES, UserErrors, UsersRepository } from '../constants';
import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepository) private readonly usersRepository: typeof User,
    @Inject('Sequelize') private readonly sequelize: Sequelize
  ) {}

  async create(userDto: UserDto): Promise<User> {
    return User.create(userDto, { raw: true });
  }

  async update(id: number, userDto: UserDto): Promise<User> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException(UserErrors.USER_NOT_FOUND);
    }

    await this.sequelize.transaction(async transaction => {
      await user.set(userDto).save({ transaction });
    });

    return this.findById(id);
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findById(id, {
      attributes: USER_ATTRIBUTES
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<BaseResponse<User>> {
    return this.usersRepository.findAndCountAll({
      attributes: USER_ATTRIBUTES,
      raw: true
    });
  }
}
