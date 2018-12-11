import { Module } from '@nestjs/common';
import { DatabaseModule } from 'database/database.module';

import { CATEGORIES_PROVIDERS } from './categories.providers';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';

@Module({
  imports: [DatabaseModule],
  providers: [...CATEGORIES_PROVIDERS, CategoriesService],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
