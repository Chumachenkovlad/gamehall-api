import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from 'config/config.service';
import { Sequelize } from 'sequelize-typescript';

import { CategoriesRepository } from '../constants';
import { CategoryDto } from '../dto/Category.dto';
import { Category } from '../entities/Category.entity';

type CategoryAttrs = keyof Category;
const Category_ATTRS: CategoryAttrs[] = ['id', 'name', 'description'];

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CategoriesRepository) private readonly categoryRepository: typeof Category,
    @Inject('Sequelize') private readonly sequelize: Sequelize,
    private readonly configService: ConfigService
  ) {}

  async create(categoryDto: Readonly<CategoryDto>) {
    return this.categoryRepository.create(categoryDto);
  }

  async update(id: number, categoryDto: Readonly<Partial<CategoryDto>>) {
    const category = await this.findById(id);

    if (!category) {
      throw new NotFoundException();
    }

    await this.sequelize.transaction(async transaction => {
      await category.set(categoryDto).save({ transaction });
    });

    return this.findById(id);
  }

  async delete(id: number) {
    const category = await this.findById(id);

    if (!category) {
      throw new NotFoundException();
    }

    return category.destroy();
  }

  async findById(id: number) {
    return this.categoryRepository.findById(id);
  }

  // TODO add query
  async findAll() {
    return this.categoryRepository.findAndCountAll({
      attributes: Category_ATTRS,
      raw: true
    });
  }
}
