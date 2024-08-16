import { Logger, Module, OnModuleDestroy } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './external/logger/infrastructure/logger.module';
import { ContextModule } from './context/infrastructure/context.module';
import { ConfigModule } from './config/config.module';
import { FileParserModule } from './main/domain/file-parser/file-parser.module';
import { HttpExceptionFilter } from './infrastructure/exceptions/filter/app/http-exception.filter';
import { HealthModule } from './health/health.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StudioModule } from './main/domain/entity/studio/studio.module';
import { MovieModule } from './main/domain/entity/movie/movie.module';
import { ProducersModule } from './main/domain/entity/producer/producers.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ConfigModule,
    LoggerModule,
    ContextModule,
    FileParserModule,
    HealthModule,
    StudioModule,
    MovieModule,
    ProducersModule,
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
