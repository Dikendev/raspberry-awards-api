import { INestApplication } from '@nestjs/common';
import { LoggerAdapterService } from '../external/logger/infrastructure/logger-adapter.service';
import { HttpExceptionFilter } from '../infrastructure/exceptions/filter/app/http-exception.filter';
import { Logger } from '@nestjs/common';
import { MongoExceptionFilter } from '../infrastructure/exceptions/filter/mongo/mongo-exception.filter';
import { ZodFilter } from '../infrastructure/exceptions/filter/zod/zod.filter';

export async function globalConfig(app: INestApplication): Promise<void> {
  const logger = new Logger('NestApplication');
  logger.log('Starting application');

  globalFilters(app);

  app.useLogger(app.get(LoggerAdapterService));
  app.enableShutdownHooks();
  app.enableCors();
  app.setGlobalPrefix('api');
  shutDown(app, logger);
  await serverListen(app, logger);
}

export function globalFilters(app: INestApplication) {
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new MongoExceptionFilter(),
    new ZodFilter(),
  );
}

async function serverListen(
  app: INestApplication,
  logger: Logger,
): Promise<void> {
  await app.listen(process.env.PORT);
  logger.log(`Server running on http://localhost:${process.env.PORT}`);
}

export async function shutDown(
  app: INestApplication,
  logger: Logger,
): Promise<void> {
  const cleanup = async () => {
    await app.close();
    logger.log('Application closed');
    process.exit(0);
  };

  process.on('SIGTERM', cleanup);
  process.on('SIGINT', cleanup);
  process.on('exit', cleanup);
}
