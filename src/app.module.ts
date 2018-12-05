import { Module } from '@nestjs/common';
import { ConfigModule } from 'config/config.module';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule, DatabaseModule, ConfigModule]
})
export class AppModule {}
