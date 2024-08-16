import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '../config.module';

describe('ConfigModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
