import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ApiHealthIndicatorService } from './api/api-health-indicator.service';
import { TerminusLoggerService } from './terminus/terminus-logger.service';
import { HealthController } from './health.controller';

@Module({
  imports: [
    TerminusModule.forRoot({
      errorLogStyle: 'pretty',
      logger: TerminusLoggerService,
      gracefulShutdownTimeoutMs: 1000,
    }),
  ],
  providers: [ApiHealthIndicatorService],
  controllers: [HealthController],
})
export class HealthModule {}
