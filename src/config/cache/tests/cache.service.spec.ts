import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from '../cache.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import {
  Logger,
  LoggerKey,
} from '../../../external/logger/domain/logger.repository';

describe('CacheService', () => {
  let service: CacheService;
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        NestConfigModule.forRoot(),
        CacheModule.register({
          isGlobal: true,
          store: 'memory',
          max: 10,
          ttl: 600,
        }),
        ConfigModule,
      ],
      providers: [
        CacheService,
        { provide: LoggerKey, useValue: { info: jest.fn(), error: jest.fn() } },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
    logger = module.get<Logger>(LoggerKey);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should logger be defined', () => {
    expect(logger).toBeDefined();
  });
});
