import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CardsRepository } from 'cards/constants';
import { CardDto } from 'cards/dto/card.dto';
import { Card } from 'cards/entities/card.entity';
import { ConfigService } from 'config/config.service';
import { transform } from 'lodash';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

type CardAttrs = keyof Card;
const CARD_ATTRS: CardAttrs[] = ['id', 'name', 'hint', 'image'];

@Injectable()
export class CardsService {
  constructor(
    @Inject(CardsRepository) private readonly cardsRepository: typeof Card,
    @Inject('Sequelize') private readonly sequelize: Sequelize,
    private readonly configService: ConfigService
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

  async findAll(query: any = {}) {
    console.log(query);
    // TODO refactor logic
    const where = transform(
      query.filter || {},
      (result, value, key: string) => {
        switch (key) {
          case 'id': {
            return (
              value &&
              Object.assign(result, {
                [key]: Object.assign((value as string).split(',').map(val => ({ [Op.or]: val })))
              })
            );
          }
          case 'name': {
            return Object.assign(result, { [key]: { [Op.like]: `%${value}%` } });
          }
          case 'category': {
            const { id } = (value as { id: string }) || { id: null };
            return (
              id &&
              Object.assign(result, {
                [key]: {
                  id: Object.assign((value as string).split(',').map(val => ({ [Op.or]: val })))
                }
              })
            );
          }
        }

        return result;
      },
      {}
    );

    console.log(where);

    this.cardsRepository.findAndCountAll;
    return this.cardsRepository.findAndCountAll({
      attributes: CARD_ATTRS,
      limit: Number(query.limit) || this.configService.defaultLimit,
      offset: Number(query.offset) || 0,
      where
    });
  }
}
