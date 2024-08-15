import { Test, TestingModule } from '@nestjs/testing';
import { LoggerAdapterService } from '../logger-adapter.service';

describe('LoggerAdapterService', () => {
  let service: LoggerAdapterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerAdapterService],
    }).compile();

    service = module.get<LoggerAdapterService>(LoggerAdapterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
