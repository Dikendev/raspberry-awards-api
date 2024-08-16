import { Test, TestingModule } from '@nestjs/testing';
import { TerminusLoggerService } from './terminus-logger.service';
import { ConsoleLogger } from '@nestjs/common';

describe('TerminusLoggerService', () => {
  let service: TerminusLoggerService;
  let consoleLoggerSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TerminusLoggerService],
    }).compile();

    service = module.get<TerminusLoggerService>(TerminusLoggerService);
    consoleLoggerSpy = jest
      .spyOn(ConsoleLogger.prototype, 'error')
      .mockImplementation(() => {});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should console logger be defined', () => {
    expect(consoleLoggerSpy).toBeDefined();
  });

  it('should call ConsoleLogger.error with correct parameters', () => {
    const message = 'Test error message';
    const stack = 'Test stack';
    const context = 'Test context';

    service.error(message, stack, context);

    expect(consoleLoggerSpy).toHaveBeenCalledWith(message, stack, context);
  });

  it('should call ConsoleLogger.error with optional parameters', () => {
    const message = 'Test error message';
    const optionalParam1 = 'Optional param 1';
    const optionalParam2 = 'Optional param 2';

    service.error(message, optionalParam1, optionalParam2);

    expect(consoleLoggerSpy).toHaveBeenCalledWith(
      message,
      optionalParam1,
      optionalParam2,
    );
  });
});
