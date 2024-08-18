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

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly apiHealthIndicatorService: ApiHealthIndicatorService,
  ) {}

  @Get()
  @HealthCheck()
  async checkApi(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      async () =>
        this.apiHealthIndicatorService.isHealthy(_API_HEALTH_INDICATOR),
    ]);
  }
}
