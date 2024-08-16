import { LoggerAdapterService } from '../logger-adapter.service';
import { Logger } from '../../domain/logger.repository';

describe('LoggerAdapterService', () => {
  let service: LoggerAdapterService;
  let logger: Logger;

  beforeEach(async () => {
    logger = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      log: jest.fn(),
      fatal: jest.fn(),
      emergency: jest.fn(),
      startProfile: jest.fn(),
    };

    service = new LoggerAdapterService(logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should logger to be defined', () => {
    expect(logger).toBeDefined();
  });

  it('should call logger.info on log', () => {
    const message = 'Test log message';
    const optionalParams = ['sourceClass'];

    service.log(message, ...optionalParams);

    expect(logger.info).toHaveBeenCalledWith(message, {
      sourceClass: ['sourceClass'],
    });
  });

  it('should log error message', () => {
    const message = 'Test error message';
    const optionalParams = ['sourceClass'];

    service.error(message, ...optionalParams);

    expect(logger.error).toHaveBeenCalledWith(message, {
      sourceClass: ['sourceClass'],
    });
  });

  it('should log warning messages', () => {
    const message = 'Warning message';
    const optionalParams = ['sourceClass'];

    service.warn(message, ...optionalParams);

    expect(logger.warn).toHaveBeenCalledWith(message, {
      sourceClass: ['sourceClass'],
    });
  });

  it('should log debug messages', () => {
    const message = 'Debug message';
    const optionalParams = ['sourceClass'];

    service.debug(message, ...optionalParams);

    expect(logger.debug).toHaveBeenCalledWith(message, {
      sourceClass: ['sourceClass'],
    });
  });

  it('should log verbose messages', () => {
    const message = 'Verbose message';
    const optionalParams = ['sourceClass'];

    service.verbose(message, ...optionalParams);

    expect(logger.info).toHaveBeenCalledWith(message, {
      sourceClass: ['sourceClass'],
    });
  });
});
