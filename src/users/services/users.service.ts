import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { USER } from '../constants';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(USER) private readonly catModel: Model<User>) {}
}