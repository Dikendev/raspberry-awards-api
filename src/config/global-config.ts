import { INestApplication } from '@nestjs/common';
import { LoggerAdapterService } from '../external/logger/infrastructure/logger-adapter.service';
import { HttpExceptionFilter } from '../infrastructure/filter/http-exception.filter';

export function globalConfig(app: INestApplication): void {
  app.useLogger(app.get(LoggerAdapterService));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableShutdownHooks();
  app.enableCors();
}
