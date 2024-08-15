import {
  Global,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger, LoggerBaseKey, LoggerKey } from '../domain/logger.repository';
import {
  WinstonLogger,
  WinstonLoggerTransportKey,
} from './winston/winston-logger';
import { LoggerService } from '../domain/logger.service';
import { LoggerAdapterService } from './logger-adapter.service';
import ConsoleTransport from './winston/transports/console-transport';
import { FileTransport } from './winston/transports/file-transport';
import * as morgan from 'morgan';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * @description
 * Provides all logging infrastructure for the application
 */
@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    { provide: LoggerBaseKey, useClass: WinstonLogger },
    { provide: LoggerKey, useClass: LoggerService },
    {
      provide: LoggerAdapterService,
      useFactory: (logger: Logger) => new LoggerAdapterService(logger),
      inject: [LoggerKey],
    },
    {
      provide: WinstonLoggerTransportKey,
      useFactory: () => {
        const transports = [];
        transports.push(ConsoleTransport.createColorize());
        transports.push(FileTransport.create());
        return transports;
      },
      inject: [ConfigService],
    },
  ],
  exports: [LoggerKey, LoggerAdapterService],
})
export class LoggerModule implements NestModule {
  constructor(@Inject(LoggerKey) private logger: Logger) {}

  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        morgan(isProduction ? 'combined' : 'dev', {
          stream: {
            write: (message: string) => {
              this.logger.debug(message, {
                sourceClass: 'RequestLogger',
              });
            },
          },
        }),
      )
      .forRoutes('*');
  }
}
