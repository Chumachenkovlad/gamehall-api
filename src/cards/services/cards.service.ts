import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CardsRepository } from 'cards/constants';
import { CardDto } from 'cards/dto/card.dto';
import { Card } from 'cards/entities/card.entity';
import { Sequelize } from 'sequelize-typescript';

type CardAttrs = keyof Card;
const CARD_ATTRS: CardAttrs[] = ['id', 'name', 'hint', 'image'];

@Injectable()
export class CardsService {
  constructor(
    @Inject(CardsRepository) private readonly cardsRepository: typeof Card,
    @Inject('Sequelize') private readonly sequelize: Sequelize
  ) {}

  async create(cardDto: Readonly<CardDto>) {
    return this.cardsRepository.create(cardDto);
  }

  async update(id: number, cardDto: Readonly<Partial<CardDto>>) {
    const card = await this.findById(id);

    if (!card) {
      throw new NotFoundException();
    }

    await this.sequelize.transaction(async transaction => {
      await card.set(cardDto).save({ transaction });
    });

    return this.findById(id);
  }

  async delete(id: number) {
    const card = await this.findById(id);

    if (!card) {
      throw new NotFoundException();
    }

    return card.destroy();
  }

  async findById(id: number) {
    return this.cardsRepository.findById(id);
  }

  // TODO add query
  async findAll() {
    this.cardsRepository.findAndCountAll;
    return this.cardsRepository.findAndCountAll({
      attributes: CARD_ATTRS
    });
  }
}
