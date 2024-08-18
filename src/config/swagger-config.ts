import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export const swaggerConfigs = (app: INestApplication) => {
  const swagger_url = 'api/sw';

  const config = new DocumentBuilder()
    .setTitle('Raspberry API')
    .setDescription('Raspberry API Application')
    .setVersion('1.0')
    .addTag('Application that show the Raspberry Awards winners')
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      basePath: '/api',
    },
    customSiteTitle: 'People Analytics API Docs',
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swagger_url, app, document, customOptions);
};
