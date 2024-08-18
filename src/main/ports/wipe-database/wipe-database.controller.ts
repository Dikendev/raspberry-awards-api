import { Controller, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PopulateDatabaseService } from '../../services/populate-database/populate-database.service';
import { ApiSwagger } from '../../../decorators/swagger.decorator';

@ApiTags('Wipe Database')
@Controller('wipe')
export class WipeDatabaseController {
  constructor(
    private readonly populateDatabaseService: PopulateDatabaseService,
  ) {}

  @ApiSwagger(
    'Wipe Database',
    'Wipe the database',
    'Wipe the database. Returns a message indicating that the database was wiped.',
  )
  @Delete()
  async wipeDataBase(): Promise<string> {
    return this.populateDatabaseService.wipeDataBase();
  }
}
