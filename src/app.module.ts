import { Logger, Module, OnModuleDestroy } from '@nestjs/common';
import { LoggerModule } from './external/logger/infrastructure/logger.module';
import { ContextModule } from './context/infrastructure/context.module';
import { ConfigModule } from './config/config.module';
import { HttpExceptionFilter } from './infrastructure/exceptions/filter/app/http-exception.filter';
import { HealthModule } from './health/health.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PopulateDatabaseModule } from './main/use-cases/when-file-is-loaded/populate-database.module';
import { AnalyticsModule } from './main/services/analytics/analytics.module';
import { DomainModule } from './main/domain/domain.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ConfigModule,
    LoggerModule,
    ContextModule,
    HealthModule,
    PopulateDatabaseModule,
    AnalyticsModule,
    DomainModule,
  ],
  providers: [{ provide: 'APP_FILTER', useClass: HttpExceptionFilter }],
  controllers: [],
})
export class AppModule implements OnModuleDestroy {
  onModuleDestroy(): any {
    const logger = new Logger('NestApplication');
    logger.log('Module destroyed');
  }
}
