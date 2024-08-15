import { Inject, Injectable, Scope } from '@nestjs/common';
import { LogLevel, LogData } from './log';
import { Logger, LoggerBaseKey } from './logger.repository';
import { ConfigService } from '@nestjs/config';
import { INQUIRER } from '@nestjs/core';
import { ContextStorageServiceKey } from '../../../context/domain/context-storage-service.interface';
import { ClsContextStorageService } from '../../../context/infrastructure/cls/cls-context-storage.service';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements Logger {
  private sourceClass: string;
  private organization: string;
  private context: string;
  private app: string;

  constructor(
    @Inject(LoggerBaseKey) private logger: Logger,
    @Inject(INQUIRER) inquirer: object,
    @Inject(ContextStorageServiceKey)
    private contextStorageService: ClsContextStorageService,
    configService: ConfigService,
  ) {
    this.sourceClass = inquirer?.constructor?.name;
    this.organization = configService.get<string>('ORGANIZATION');
    this.context = configService.get<string>('CONTEXT');
    this.app = configService.get<string>('APP');
  }

  log(
    level: LogLevel,
    message: string | Error,
    data?: LogData,
    profile?: string,
  ): void {
    return this.logger.log(level, message, this.getLogData(data), profile);
  }

  debug(message: string, data?: LogData, profile?: string): void {
    return this.logger.debug(message, this.getLogData(data), profile);
  }

  info(message: string, data?: LogData, profile?: string): void {
    return this.logger.info(message, this.getLogData(data), profile);
  }

  warn(message: string | Error, data?: LogData, profile?: string): void {
    return this.logger.warn(message, this.getLogData(data), profile);
  }

  error(message: string | Error, data?: LogData, profile?: string): void {
    return this.logger.error(message, this.getLogData(data), profile);
  }

  fatal(message: string | Error, data?: LogData, profile?: string): void {
    this.logger.fatal(message, this.getLogData(data), profile);
  }

  emergency(message: string | Error, data?: LogData, profile?: string): void {
    return this.logger.emergency(message, this.getLogData(data), profile);
  }

  startProfile(id: string): void {
    this.logger.startProfile(id);
  }

  private getLogData(data?: LogData): LogData {
    return {
      ...data,
      organization: data?.organization || this.organization,
      context: data?.context || this.context,
      app: data?.app || this.app,
      sourceClass: data?.sourceClass || this.sourceClass,
      correlationId:
        data?.correlationId || this.contextStorageService.getContextId(),
    };
  }
}
