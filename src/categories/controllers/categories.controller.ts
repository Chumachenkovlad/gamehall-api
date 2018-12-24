import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { BaseResponse } from 'common';
import { SuperUserGuard } from 'common/guards/superuser.guard';

import { CategoryDto } from '../dto/category.dto';
import { Category } from '../entities/category.entity';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get() async getAll(): Promise<BaseResponse<Partial<Category>>> {
    return this.categoriesService.findAll();
  }

  @Get(':id') async getOne(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.findById(id);
  }

  @UseGuards(JwtAuthGuard, SuperUserGuard)
  @Post()
  async create(@Body() cardDto: CategoryDto): Promise<Category> {
    return this.categoriesService.create(cardDto);
  }

  @UseGuards(JwtAuthGuard, SuperUserGuard)
  @Patch()
  async update(@Body() cardDto: CategoryDto): Promise<Category> {
    return this.categoriesService.create(cardDto);
  }
}
