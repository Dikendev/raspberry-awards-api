import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Logger, LoggerKey } from './external/logger/domain/logger.repository';

describe('AppController', () => {
  let appController: AppController;
  let logger: Logger;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: LoggerKey, useValue: { info: jest.fn() } },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    logger = app.get<Logger>(LoggerKey);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should logger be defined', () => {
    expect(logger).toBeDefined();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
