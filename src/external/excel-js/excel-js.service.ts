import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ParserRepository } from './repository/parser-repository';
import { Readable } from 'stream';
import { LoggerKey, Logger } from '../logger/domain/logger.repository';
import { _CSV_OPTIONS } from './constants/option.constant';
import * as ExcelJS from 'exceljs';
import path from 'path';

@Injectable()
export class ExcelJsService implements ParserRepository {
  fileResult: any;
  workBook: ExcelJS.Workbook;

  constructor(@Inject(LoggerKey) private logger: Logger) {
    this.initModuleConfig();
  }

  initModuleConfig() {
    this.workBook = new ExcelJS.Workbook();
    this.fileResult = undefined;
  }

  async read(file: Express.Multer.File): Promise<ExcelJS.Workbook> {
    try {
      this.logger.info('Reading file');
      const stream = this.bufferToStream(file.buffer);
      await this.workBook.csv.read(stream, this.setCsvOptions());

      return this.workBook;
    } catch (error) {
      this.logger.error('Error reading file', error);
    }
  }

  async readLocal(): Promise<ExcelJS.Workbook> {
    try {
      this.logger.info('Reading file');
      const fileLocal = 'src/public/movielist.csv';
      await this.workBook.csv.readFile(fileLocal, this.setCsvOptions());

      return this.workBook;
    } catch (error) {
      this.logger.error('Error reading file', error);
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
