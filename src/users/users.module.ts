import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UsersRepository } from './constants';
import { UsersSelfController } from './controllers/users-self/users-self.controller';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    UsersService,
    {
      provide: UsersRepository,
      useValue: User
    }
  ],
  exports: [UsersService],
  controllers: [UsersSelfController]
})
export class UsersModule {}
