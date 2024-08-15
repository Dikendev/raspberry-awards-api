import { INestApplication } from '@nestjs/common';
import { LoggerAdapterService } from '../external/logger/infrastructure/logger-adapter.service';

export function globalConfig(app: INestApplication): void {
  app.useLogger(app.get(LoggerAdapterService));
  app.enableShutdownHooks();
  app.enableCors();
}
