import { INestApplication } from '@nestjs/common';
import { globalConfig } from '../global-config';
import { LoggerAdapterService } from '../../external/logger/infrastructure/logger-adapter.service';

describe('globalConfig', () => {
  let app: INestApplication;
  let loggerAdapterService: LoggerAdapterService;

  beforeEach(async () => {
    loggerAdapterService = {
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      log: jest.fn(),
      fatal: jest.fn(),
    } as unknown as LoggerAdapterService;

    const mockApp = {
      useLogger: jest.fn(),
      useGlobalFilters: jest.fn(),
      enableShutdownHooks: jest.fn(),
      enableCors: jest.fn(),
      get: jest.fn().mockReturnValue(loggerAdapterService),
    };

    app = mockApp as unknown as INestApplication;
  });

  it('should app to be defined', () => {
    expect(app).toBeDefined();
  });

  it('should loggerAdapterService to be defined', () => {
    expect(loggerAdapterService).toBeDefined();
  });

  it('should configure the logger service', () => {
    globalConfig(app);
    expect(app.useLogger).toHaveBeenCalledWith(loggerAdapterService);
  });

  it('should configure the global filters', () => {
    globalConfig(app);
    expect(app.useGlobalFilters).toHaveBeenCalled();
  });

  it('should enable the shutdown hooks', () => {
    globalConfig(app);
    expect(app.enableShutdownHooks).toHaveBeenCalled();
  });

  it('should enable the CORS', () => {
    globalConfig(app);
    expect(app.enableCors).toHaveBeenCalled();
  });
});
