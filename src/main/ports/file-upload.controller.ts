import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileParserService } from '../services/file-parser/file-parser.service';
import { ResultCsvFileStructures } from '../services/file-parser/interfaces/csv.interface';

@Controller('upload-file')
export class FileUploadController {
  constructor(private readonly fileParserService: FileParserService) {}

  @Post('csv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResultCsvFileStructures> {
    return this.fileParserService.csv(file);
  }

  @Get('csv-local')
  async getCsvLocal(): Promise<ResultCsvFileStructures> {
    console.log('csv-local');
    return await this.fileParserService.csvLocal();
  }
}
