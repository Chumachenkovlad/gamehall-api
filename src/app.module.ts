import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ req })
    }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
