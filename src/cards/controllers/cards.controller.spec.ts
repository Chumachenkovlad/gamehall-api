import { Test, TestingModule } from '@nestjs/testing';
import { CardsController } from './cards.controller';

describe('Cards Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CardsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: CardsController = module.get<CardsController>(CardsController);
    expect(controller).toBeDefined();
  });
});
