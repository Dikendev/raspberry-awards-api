import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
} from '@nestjs/terminus';
import {
  _API_HEALTH_INDICATOR,
  ApiHealthIndicatorService,
} from './api/api-health-indicator.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Api Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly apiHealthIndicatorService: ApiHealthIndicatorService,
  ) {}

  @ApiTags('Api Health')
  @ApiOperation({
    summary: 'Check the health of the API',
    description: 'Check the health of the API. Returns the health of the API.',
  })
  @Get()
  @HealthCheck()
  async checkApi(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      async () =>
        this.apiHealthIndicatorService.isHealthy(_API_HEALTH_INDICATOR),
    ]);
  }
}
