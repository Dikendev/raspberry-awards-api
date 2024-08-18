import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalConfig } from './config/global-config';
import { swaggerConfigs } from './config/swagger-config';

(async () => {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  globalConfig(app);
  swaggerConfigs(app);
})();
