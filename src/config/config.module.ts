import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

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
})
export class ConfigModule {}
