import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';

@Injectable()
export class ApiHealthIndicatorService extends HealthIndicator {
  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const uptime = process.uptime();
    const isHealthy = uptime > 0;
    const result = this.getStatus(key, isHealthy, { uptime });

    if (!isHealthy) {
      throw new HealthCheckError('API is not healthy', result);
    }

    return result;
  }
}
