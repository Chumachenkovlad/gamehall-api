import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { transform } from 'lodash';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { CommonErrors } from '../../common/enums/errors';
import { ConfigService } from '../../config/config.service';
import { CardsRepository } from '../constants';
import { CardDto } from '../dto/card.dto';
import { Card } from '../entities/card.entity';

type CardAttrs = keyof Card;
const CARD_ATTRS: CardAttrs[] = ['id', 'name', 'frequency'];

@Injectable()
export class CardsService {
  constructor(
    @Inject(CardsRepository) private readonly cardsRepository: typeof Card,
    @Inject('Sequelize') private readonly sequelize: Sequelize,
    private readonly configService: ConfigService
  ) {}

  async create(cardDto: Readonly<CardDto> | Readonly<CardDto>[]) {
    return this.cardsRepository.create(cardDto);
  }

  async update(id: number, cardDto: Readonly<Partial<CardDto>>) {
    const card = await this.findById(id);

    await this.sequelize.transaction(async transaction => {
      await card.set(cardDto).save({ transaction });
    });

    return this.findById(id);
  }

  async delete(id: number) {
    const card = await this.findById(id);

    return card.destroy();
  }

  async findById(id: number) {
    const card = await this.cardsRepository.findByPrimary(id);

    if (!card) {
      throw new NotFoundException(CommonErrors.NOT_FOUND_ENTITY);
    }

    return card;
  }

  async findAll(query: any = {}) {
    return this.cardsRepository.findAndCountAll(this.createQueryOptions(query));
  }

  async countAll(query: any = {}) {
    return this.cardsRepository.count(this.createQueryOptions(query));
  }

  private createQueryOptions(query: any) {
    const where = transform(
      query.filter || {},
      (result, value, key: string) => {
        switch (key) {
          case 'categoryId':
          case 'id': {
            return (
              value &&
              Object.assign(result, {
                [key]: Object.assign({ [Op.or]: (value as string).split(',').map(Number) })
              })
            );
          }
          case 'name': {
            return Object.assign(result, { [key]: { [Op.like]: `%${value}%` } });
          }
        }

        return result;
      },
      {}
    );

    return {
      where,
      attributes: CARD_ATTRS,
      limit: Number(query.limit) || this.configService.defaultLimit,
      offset: Number(query.offset) || 0,
      order: this.sequelize.literal('rand()')
    };
  }
}
