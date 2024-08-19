import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import {
  Logger,
  LoggerKey,
} from '../../external/logger/domain/logger.repository';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(LoggerKey) private logger: Logger,
  ) {}

  async checkCache(key: string): Promise<any> {
    const cachedData = await this.cacheManager.get(key);
    this.logger.debug(`Cache data for key ${key}: ${cachedData}`);
    return cachedData;
  }

  async clearCache(key: string): Promise<void> {
    await this.cacheManager.del(key);
    this.logger.debug(`Cache cleared for key ${key}`);
  }
}
