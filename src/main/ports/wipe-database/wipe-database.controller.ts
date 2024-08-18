import { Controller, Delete, Inject } from '@nestjs/common';
import mongoose from 'mongoose';
import {
  Logger,
  LoggerKey,
} from '../../../external/logger/domain/logger.repository';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Wipe Database')
@Controller('wipe')
export class WipeDatabaseController {
  constructor(@Inject(LoggerKey) private logger: Logger) {}

  @ApiTags('Wipe Database')
  @ApiOperation({
    summary: 'Wipe the database',
    description:
      'Wipe the database. Returns a message indicating that the database was wiped.',
  })
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
