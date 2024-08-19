import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { ProducersModule } from '../../domain/entity/producer/producers.module';
import { MovieModule } from '../../domain/entity/movie/movie.module';
import { StudioModule } from '../../domain/entity/studio/studio.module';

@Module({
  imports: [ProducersModule, MovieModule, StudioModule],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
