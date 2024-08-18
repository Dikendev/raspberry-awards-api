import { Test, TestingModule } from '@nestjs/testing';
import { WipeDatabaseController } from './wipe-database.controller';

describe('WipeDatabaseController', () => {
  let controller: WipeDatabaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WipeDatabaseController],
    }).compile();

    controller = module.get<WipeDatabaseController>(WipeDatabaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
