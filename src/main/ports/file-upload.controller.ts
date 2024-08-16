import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileParserService } from '../domain/file-parser/file-parser.service';
import { ResultCsvFileStructures } from '../domain/file-parser/interfaces/csv.interface';

@Controller('upload-file')
export class FileUploadController {
  constructor(private readonly fileParserService: FileParserService) {}

  @Post('csv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResultCsvFileStructures> {
    throw new HttpException('TIME OUTTTTT', HttpStatus.REQUEST_TIMEOUT);
    return this.fileParserService.csv(file);
  }
}
