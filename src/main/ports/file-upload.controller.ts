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

@Controller('upload-file')
export class FileUploadController {
  constructor(
    private readonly populateDatabaseService: PopulateDatabaseService,
  ) {}

  @Post('csv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResultCsvFileStructures> {
    return this.populateDatabaseService.csv(file);
  }

  @Get('csv-local')
  async getCsvLocal(): Promise<ResultCsvFileStructures> {
    return await this.populateDatabaseService.csvLocal();
  }
}
