import { Module } from '@nestjs/common';
import { DatabaseModule } from 'database/database.module';

import { CARD_PROVIDERS } from './cards.providers';
import { CardsController } from './controllers/cards.controller';
import { CardsService } from './services/cards.service';

@Module({
  imports: [DatabaseModule],
  providers: [...CARD_PROVIDERS, CardsService],
  controllers: [CardsController],
  exports: [CardsService]
})
export class CardsModule {}
