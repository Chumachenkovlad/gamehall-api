import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CardDto } from 'cards/dto/card.dto';
import { Card } from 'cards/entities/card.entity';
import { CardsService } from 'cards/services/cards.service';
import { BaseResponse } from 'common';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get() async getAll(): Promise<BaseResponse<Partial<Card>>> {
    return this.cardsService.findAll();
  }

  @Get(':id') async getOne(@Param() id: number): Promise<Card> {
    return this.cardsService.findById(id);
  }

  @Post() async create(@Body() cardDto: CardDto): Promise<Card> {
    return this.cardsService.create(cardDto);
  }

  @Patch() async update(@Body() cardDto: CardDto): Promise<Card> {
    return this.cardsService.create(cardDto);
  }
}