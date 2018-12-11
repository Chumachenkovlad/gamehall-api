import { CardsRepository } from './constants';
import { Card } from './entities/card.entity';

export const CARD_PROVIDERS = [
  {
    provide: CardsRepository,
    useValue: Card
  }
];
