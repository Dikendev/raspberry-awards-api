import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResultCsvFileStructures } from '../services/file-parser/interfaces/csv.interface';
import { PopulateDatabaseService } from '../use-cases/when-file-is-loaded/populate-database.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Upload File')
@Controller('upload-file')
export class FileUploadController {
  constructor(
    private readonly populateDatabaseService: PopulateDatabaseService,
  ) {}

  @ApiTags('Upload File')
  @ApiOperation({
    summary: 'Create a new studio',
    description:
      'Create a new Movie with the provided data. Returns the created Movie.',
  })
  @Post('csv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResultCsvFileStructures> {
    return this.populateDatabaseService.csv(file);
  }

  @ApiTags('Upload File')
  @ApiOperation({
    summary: 'Create a new movire',
    description:
      'Create a new movie with the provided data. Returns the created movie.',
  })
  @Get('csv-local')
  async getCsvLocal(): Promise<ResultCsvFileStructures> {
    return await this.populateDatabaseService.csvLocal();
  }
}
