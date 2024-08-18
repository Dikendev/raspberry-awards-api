import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('largest-gap')
  async getProducerWithLargestGap() {
    return this.analyticsService.getProducerWithLargestGap();
  }

  @Get('fastest-wins')
  async getProducerWithFastestWins() {
    return this.analyticsService.getProducerWithFastestWins();
  }

  @Get('movie-counts')
  async getProducerMovieCounts() {
    return this.analyticsService.getProducerMovieCounts();
  }
}
