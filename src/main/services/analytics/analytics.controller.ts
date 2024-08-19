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
  async producerWithLargestGap(): Promise<AnalyticsLargestGap> {
    return this.analyticsService.producerWithLargestGap();
  }

  @ApiSwagger(
    'Analytics',
    'Get the producer with the fastest wins',
    'Get the producer with the fastest wins. Returns the producer.',
  )
  @Get('fastest-wins')
  async producerWithFastestWins(): Promise<AnalyticsFastestWins> {
    return this.analyticsService.producerWithFastestWins();
  }

  @ApiSwagger(
    'Analytics',
    'Get the producer with the most movies count',
    'Get the producer with the most movies. Returns the result.',
  )
  @Get('movie-counts')
  async producerMovieCounts(): Promise<AnalyticsMovieCounts> {
    return this.analyticsService.producerMovieCounts();
  }

  @ApiSwagger(
    'Analytics',
    'Get the movies count by year',
    'Get the movies count by year. Returns the result.',
  )
  @Get('movie-counts-by-year')
  async moviesCountsByYear(): Promise<any> {
    return this.analyticsService.moviesCountByYear();
  }

  @ApiSwagger(
    'Analytics',
    'Get the studio count',
    'Get the studio count. Returns the result.',
  )
  @Get('studio-count')
  async studioCount(): Promise<any> {
    return this.analyticsService.studioCount();
  }

  @ApiSwagger(
    'Analytics',
    'Get the movies count by studio',
    'Get the movies count by studio. Returns the result.',
  )
  @Get('movie-counts-by-studio')
  async moviesCountByStudio(): Promise<any> {
    return this.analyticsService.moviesCountByStudio();
  }
}
