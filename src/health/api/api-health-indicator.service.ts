import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';

export const _API_HEALTH_INDICATOR = 'api';
export const _API_HEALTH_INDICATOR_MESSAGE = 'API is not healthy';

@Injectable()
export class ApiHealthIndicatorService extends HealthIndicator {
  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const uptime = process.uptime();
    const isHealthy = uptime > 0;
    const result = this.getStatus(key, isHealthy, { uptime });

    if (!isHealthy) {
      throw new HealthCheckError(_API_HEALTH_INDICATOR_MESSAGE, result);
    }

    return result;
  }
}
