import { Test, TestingModule } from '@nestjs/testing';
import { UsersSelfController } from './users-self.controller';

describe('UsersSelf Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UsersSelfController]
    }).compile();
  });
  it('should be defined', () => {
    const controller: UsersSelfController = module.get<UsersSelfController>(UsersSelfController);
    expect(controller).toBeDefined();
  });
});
