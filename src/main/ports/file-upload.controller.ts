import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResultCsvFileStructures } from '../services/file-parser/interfaces/csv.interface';
import { PopulateDatabaseService } from '../services/populate-database/populate-database.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiSwagger } from '../../decorators/swagger.decorator';

@ApiTags('Upload File')
@Controller('upload-file')
export class FileUploadController {
  constructor(
    private readonly populateDatabaseService: PopulateDatabaseService,
  ) {}

  @ApiSwagger('Upload File', 'Upload a CSV file', 'Upload a CSV file.')
  @Post('csv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResultCsvFileStructures> {
    return this.populateDatabaseService.csv(file);
  }

  @ApiSwagger(
    'Upload File',
    'Find for a csv at public folder',
    'The csv file is at public folder.',
  )
  @Get('csv-local')
  async getCsvLocal(): Promise<ResultCsvFileStructures> {
    return await this.populateDatabaseService.csvLocal();
  }
}
