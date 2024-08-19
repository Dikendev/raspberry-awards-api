import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ParserRepository } from './repository/parser-repository';
import { Readable } from 'stream';
import { LoggerKey, Logger } from '../logger/domain/logger.repository';
import { _CSV_OPTIONS } from './constants/option.constant';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExcelJsService implements ParserRepository {
  constructor(@Inject(LoggerKey) private logger: Logger) {}

  async read(file: Express.Multer.File): Promise<ExcelJS.Workbook> {
    const workBook = new ExcelJS.Workbook();
    if (file === undefined) {
      this.logger.error('File not found');
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }

    this.logger.info('Reading CSV file');

    try {
      const stream = this.bufferToStream(file.buffer);
      await workBook.csv.read(stream, this.setCsvOptions());
      this.logger.info('File read successfully');
      return workBook;
    } catch (error) {
      this.logger.error('Error reading file', { error });
      throw new HttpException(
        'Error reading file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async readLocal(): Promise<ExcelJS.Workbook> {
    const workBook = new ExcelJS.Workbook();

    this.logger.info('Reading local CSV file');
    const fileLocal = 'src/public/movielist.csv';

    try {
      await workBook.csv.readFile(fileLocal, this.setCsvOptions());
      this.logger.info('File read successfully');
      return workBook;
    } catch (error) {
      this.logger.error('Error reading file', error);
      throw new HttpException(
        'Error reading file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  setCsvOptions(): Partial<ExcelJS.CsvReadOptions> {
    return {
      parserOptions: _CSV_OPTIONS,
    };
  }

  bufferToStream(buffer: Buffer): Readable {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }
}
