import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BaseResponse } from 'common';

import { CategoryDto } from '../dto/category.dto';
import { Category } from '../entities/category.entity';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get() async getAll(): Promise<BaseResponse<Partial<Category>>> {
    return this.categoriesService.findAll();
  }

  @Get(':id') async getOne(@Param() id: number): Promise<Category> {
    return this.categoriesService.findById(id);
  }

  @Post() async create(@Body() cardDto: CategoryDto): Promise<Category> {
    return this.categoriesService.create(cardDto);
  }

  @Patch() async update(@Body() cardDto: CategoryDto): Promise<Category> {
    return this.categoriesService.create(cardDto);
  }
}
