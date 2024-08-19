import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiSwagger } from '../../../decorators/swagger.decorator';
import {
  AnalyticsFastestWins,
  AnalyticsLargestGap,
  AnalyticsMovieCounts,
} from './interfaces/analytics.interface';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @ApiSwagger(
    'Analytics',
    'Get the producer with the largest gap between movies',
    'Get the producer with the largest gap between movies. Returns the producer.',
  )
  @Get('largest-gap')
  async getProducerWithLargestGap(): Promise<AnalyticsLargestGap> {
    return this.analyticsService.getProducerWithLargestGap();
  }

  @ApiSwagger(
    'Analytics',
    'Get the producer with the fastest wins',
    'Get the producer with the fastest wins. Returns the producer.',
  )
  @Get('fastest-wins')
  async getProducerWithFastestWins(): Promise<AnalyticsFastestWins> {
    return this.analyticsService.getProducerWithFastestWins();
  }

  @ApiSwagger(
    'Analytics',
    'Get the producer with the most movies count',
    'Get the producer with the most movies. Returns the result.',
  )
  @Get('movie-counts')
  async getProducerMovieCounts(): Promise<AnalyticsMovieCounts> {
    return this.analyticsService.getProducerMovieCounts();
  }
}
