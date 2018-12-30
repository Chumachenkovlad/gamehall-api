import { Body, Controller, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SuperUserGuard } from '../common/guards/superuser.guard';
import { ErrorsInterceptor } from '../common/interceptors/errors.interceptor';
import { BaseResponse } from '../common/interfaces/base-response.interface';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './category.dto';
import { Category } from './category.entity';

@UseInterceptors(ErrorsInterceptor)
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
