import { Logger, Module, OnModuleDestroy } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './external/logger/infrastructure/logger.module';
import { ContextModule } from './context/infrastructure/context.module';
import { ConfigModule } from './config/config.module';
import { FileParserModule } from './main/domain/file-parser/file-parser.module';
import { HttpExceptionFilter } from './infrastructure/filter/http-exception.filter';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    ContextModule,
    FileParserModule,
    HealthModule,
  ],
  providers: [
    AppService,
    { provide: 'APP_FILTER', useClass: HttpExceptionFilter },
  ],
  controllers: [AppController],
})
export class AppModule implements OnModuleDestroy {
  onModuleDestroy(): any {
    const logger = new Logger('NestApplication');
    logger.log('Module destroyed');
  }
}
