import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @ApiTags('analytics')
  @ApiOperation({
    summary: 'Get the producer with the largest gap between movies',
    description:
      'Get the producer with the largest gap between movies. Returns the producer.',
  })
  @Get('largest-gap')
  async getProducerWithLargestGap() {
    return this.analyticsService.getProducerWithLargestGap();
  }

  @ApiTags('analytics')
  @ApiOperation({
    summary: 'Get the producer with the fastest wins',
    description:
      'Get the producer with the fastest wins. Returns the producer.',
  })
  @Get('fastest-wins')
  async getProducerWithFastestWins() {
    return this.analyticsService.getProducerWithFastestWins();
  }

  @ApiTags('analytics')
  @ApiOperation({
    summary: 'Get the producer with the most movies',
    description: 'Get the producer with the most movies. Returns the producer.',
  })
  @Get('movie-counts')
  async getProducerMovieCounts() {
    return this.analyticsService.getProducerMovieCounts();
  }
}
