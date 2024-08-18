import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import mongoose from 'mongoose';
import { Logger, LoggerKey } from './external/logger/domain/logger.repository';

@Controller()
export class AppController {
  constructor(
    @Inject(LoggerKey) private logger: Logger,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('wipe')
  async wipeDataBase() {
    try {
      await mongoose.connect(process.env.DATABASE_URL, {});
      await mongoose.connection.db.dropDatabase();
      this.logger.info('Database wiped');
    } catch (error) {
      console.error(error);
    }
  }
}
