import { Inject, Injectable } from '@nestjs/common';
import { Logger, LoggerKey } from './external/logger/domain/logger.repository';

@Injectable()
export class AppService {
  constructor(@Inject(LoggerKey) private logger: Logger) {}

  getHello(): string {
    this.logger.info(`Id Test`);
    return 'Hello World!';
  }
}
