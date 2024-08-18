import { Controller, Delete, Inject } from '@nestjs/common';
import mongoose from 'mongoose';
import {
  Logger,
  LoggerKey,
} from '../../../external/logger/domain/logger.repository';

@Controller('wipe')
export class WipeDatabaseController {
  constructor(@Inject(LoggerKey) private logger: Logger) {}

  @Delete()
  async wipeDataBase(): Promise<string> {
    try {
      await mongoose.connect(process.env.DATABASE_URL, {});
      await mongoose.connection.db.dropDatabase();
      this.logger.info('Database wiped');
      return `Database wiped`;
    } catch (error) {
      console.error(error);
    }
  }
}
