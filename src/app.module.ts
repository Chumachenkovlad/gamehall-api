import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { FilesModule } from './files/files.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ImagesModule } from './images/images.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DatabaseModule,
    ConfigModule,
    CategoriesModule,
    CardsModule,
    FirebaseModule,
    ImagesModule,
    FilesModule
  ]
})
export class AppModule {}
