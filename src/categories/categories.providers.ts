import { CategoriesRepository } from './constants';
import { Category } from './category.entity';

export const CATEGORIES_PROVIDERS = [
  {
    provide: CategoriesRepository,
    useValue: Category
  }
];
