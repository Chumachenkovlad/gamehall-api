import {
  Body,
  Controller,
  FileInterceptor,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { BaseResponse, File, SuperUserGuard } from '../../common';
import { CardDto } from '../dto/card.dto';
import { Card } from '../entities/card.entity';
import { CardsService } from '../services/cards.service';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  async getAll(@Query() query?: any): Promise<BaseResponse<Partial<Card>>> {
    return this.cardsService.findAll(query);
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Card> {
    return this.cardsService.findById(id);
  }

  @UseGuards(JwtAuthGuard, SuperUserGuard)
  @Post()
  async create(@Body() cardDto: CardDto): Promise<Card> {
    return this.cardsService.create(cardDto);
  }

  @UseGuards(JwtAuthGuard, SuperUserGuard)
  @Patch()
  async update(@Body() cardDto: CardDto): Promise<Card> {
    return this.cardsService.create(cardDto);
  }

  @Post('category/:categoryId/upload')
  @UseGuards(JwtAuthGuard, SuperUserGuard)
  @UseInterceptors(FileInterceptor('file'))
  public async uploadImage(@UploadedFile() file: File, @Param('categoryId') categoryId: number) {
    const cards = file.buffer
      .toString()
      .split('\n')
      .map(line => line.split('  '))
      .map(line => {
        const [name, frequency] = line;
        return { name, frequency: Number(frequency), categoryId: Number(categoryId) };
      })
      .filter(card => card.name.length > 1)
      .map(card => this.cardsService.create(card));

    return Promise.all(cards);
  }
}
