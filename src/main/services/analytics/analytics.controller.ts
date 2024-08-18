import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiSwagger } from '../../../decorators/swagger.decorator';

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
  async getProducerWithLargestGap() {
    return this.analyticsService.getProducerWithLargestGap();
  }

  @ApiSwagger(
    'Analytics',
    'Get the producer with the fastest wins',
    'Get the producer with the fastest wins. Returns the producer.',
  )
  @Get('fastest-wins')
  async getProducerWithFastestWins() {
    return this.analyticsService.getProducerWithFastestWins();
  }

  @ApiSwagger(
    'Analytics',
    'Get the producer with the most movies',
    'Get the producer with the most movies. Returns the producer.',
  )
  @Get('movie-counts')
  async getProducerMovieCounts() {
    return this.analyticsService.getProducerMovieCounts();
  }
}
