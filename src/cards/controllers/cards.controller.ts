import { Body, Controller, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { CardDto } from 'cards/dto/card.dto';
import { Card } from 'cards/entities/card.entity';
import { CardsService } from 'cards/services/cards.service';
import { BaseResponse } from 'common';
import { ErrorsInterceptor } from 'common/interceptors/errors.interceptor';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @UseInterceptors(ErrorsInterceptor)
  @Get()
  async getAll(@Query() query?: any): Promise<BaseResponse<Partial<Card>>> {
    return this.cardsService.findAll(query);
  }

  @UseInterceptors(ErrorsInterceptor)
  @Get(':id')
  async getOne(@Param() id: number): Promise<Card> {
    return this.cardsService.findById(id);
  }

  @UseInterceptors(ErrorsInterceptor)
  @Post()
  async create(@Body() cardDto: CardDto): Promise<Card> {
    return this.cardsService.create(cardDto);
  }

  @UseInterceptors(ErrorsInterceptor)
  @Patch()
  async update(@Body() cardDto: CardDto): Promise<Card> {
    return this.cardsService.create(cardDto);
  }
}
