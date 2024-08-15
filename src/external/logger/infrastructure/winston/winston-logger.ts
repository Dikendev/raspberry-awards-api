import * as winston from 'winston';

import { LogLevel, LogData } from '../../domain/log';
import { Logger } from '../../domain/logger.repository';
import { Inject } from '@nestjs/common';

export const WinstonLoggerTransportKey = Symbol();

export class WinstonLogger implements Logger {
  private logger: winston.Logger;

  public constructor(
    @Inject(WinstonLoggerTransportKey) transports: winston.transport[],
  ) {
    this.logger = winston.createLogger(this.getLoggerFormatOptions(transports));
  }

  private getLoggerFormatOptions(transports: winston.transport[]) {
    const levels: any = {};
    let cont = 0;
    Object.values(LogLevel).forEach((level) => {
      levels[level] = cont;
      cont++;
    });

    return {
      level: LogLevel.Debug,
      levels: levels,
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'DD/MM/YYYY, HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        winston.format((info, _) => {
          if (info.error && info.error instanceof Error) {
            info.stack = info.error.stack;
            info.error = undefined;
          }

          info.label = `${info.organization}.${info.context}.${info.app}`;
          return info;
        })(),
        winston.format.metadata({
          key: 'data',
          fillExcept: ['timestamp', 'level', 'message'],
        }),
        winston.format.json(),
      ),
      transports: transports,
      exceptionHandlers: transports,
      rejectionHandlers: transports,
    };
  }

  log(
    level: LogLevel,
    message: string | Error,
    data?: LogData,
    profile?: string,
  ): void {
    const logData = {
      level,
      message: message instanceof Error ? message.message : message,
      error: message instanceof Error ? message : undefined,
      ...data,
    };

    if (!profile) {
      this.logger.log(logData);
      return;
    }
    this.logger.profile(profile, logData);
  }

  debug(message: string, data?: LogData, profile?: string): void {
    this.log(LogLevel.Debug, message, data, profile);
  }

  info(message: string, data?: LogData, profile?: string): void {
    this.log(LogLevel.Info, message, data, profile);
  }

  warn(message: string | Error, data?: LogData, profile?: string): void {
    this.log(LogLevel.Warn, message, data, profile);
  }

  error(message: string | Error, data?: LogData, profile?: string): void {
    this.log(LogLevel.Error, message, data, profile);
  }

  fatal(message: string | Error, data?: LogData, profile?: string): void {
    this.log(LogLevel.Fatal, message, data, profile);
  }

  emergency(message: string | Error, data?: LogData, profile?: string): void {
    this.log(LogLevel.Emergency, message, data, profile);
  }

  startProfile(id: string): void {
    this.logger.profile(id);
  }
}
