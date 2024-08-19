import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { CacheService } from './cache/cache.service';

@Module({
  imports: [
    NestConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      store: 'memory',
      max: 10,
      ttl: 600,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class ConfigModule {}
