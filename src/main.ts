import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { globalConfig } from './config/global-config';

async function bootstrap() {
  const logger = new Logger('NestApplication');
  logger.log('Starting application');
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const cleanup = async () => {
    await app.close();
    logger.log('Application closed');
    process.exit(0);
  };

  process.on('SIGTERM', cleanup);
  process.on('SIGINT', cleanup);
  process.on('exit', cleanup);

  globalConfig(app);

  await app.listen(process.env.PORT);
  logger.log(`Server running on http://localhost:${process.env.PORT}`);
}
bootstrap();
