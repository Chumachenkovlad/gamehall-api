import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { BaseResponse, SuperUserGuard } from 'common';

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
}
