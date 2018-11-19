import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { USER } from './constants';
import { UserSchema } from './schemas/user.schema';
import { UsersService } from './services/users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: USER, schema: UserSchema }])],
  providers: [UsersService]
})
export class UsersModule {}
