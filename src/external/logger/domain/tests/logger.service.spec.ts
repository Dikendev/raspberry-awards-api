import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '../logger.service';
import { Logger, LoggerBaseKey } from '../logger.repository';
import { ConfigService } from '@nestjs/config';
import { ClsContextStorageService } from '../../../../context/infrastructure/cls/cls-context-storage.service';
import { INQUIRER } from '@nestjs/core';
import { ContextStorageServiceKey } from '../../../../context/domain/context-storage-service.interface';
import { LogData, LogLevel } from '../log';

describe('LoggerService', () => {
  let service: LoggerService;
  let loggerMock: jest.Mocked<Logger>;
  let configServiceMock: jest.Mocked<ConfigService>;
  let contextStorageServiceMock: jest.Mocked<ClsContextStorageService>;

  beforeEach(async () => {
    loggerMock = {
      log: jest.fn(),
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      fatal: jest.fn(),
      emergency: jest.fn(),
      startProfile: jest.fn(),
    } as jest.Mocked<Logger>;

    configServiceMock = {
      get: jest.fn((key: string) => {
        switch (key) {
          case 'ORGANIZATION':
            return 'organization';
          case 'CONTEXT':
            return 'context';
          case 'APP':
            return 'app';
          default:
            return null;
        }
      }),
    } as unknown as jest.Mocked<ConfigService>;

    contextStorageServiceMock = {
      getContextId: jest.fn().mockReturnValue('contextId'),
    } as unknown as jest.Mocked<ClsContextStorageService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoggerService,
        { provide: LoggerBaseKey, useValue: loggerMock },
        { provide: ConfigService, useValue: configServiceMock },
        {
          provide: ContextStorageServiceKey,
          useValue: contextStorageServiceMock,
        },
        {
          provide: INQUIRER,
          useValue: { constructor: { name: 'INQUIRER' } },
        },
      ],
    }).compile();

    service = await module.resolve<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('log', () => {
    it('should call logger.log with the correct parameters', () => {
      const level: LogLevel = LogLevel.Info;
      const message = 'Test message';

      const data: LogData = {
        app: 'app',
        context: 'context',
        correlationId: 'contextId',
        organization: 'organization',
        sourceClass: 'INQUIRER',
      };

      service.log(level, message);

      expect(loggerMock.log).toHaveBeenCalledWith(
        level,
        message,
        data,
        undefined,
      );
    });
  });
});
