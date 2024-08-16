import { Inject, Injectable } from '@nestjs/common';
import { ParserRepository } from '../../../external/excel-js/repository/parser-repository';
import {
  ResultCsvFileStructure,
  ResultCsvFileStructures,
  Winner,
} from './interfaces/csv.interface';
import * as ExcelJS from 'exceljs';
import {
  Logger,
  LoggerKey,
} from '../../../external/logger/domain/logger.repository';

@Injectable()
export class FileParserService {
  constructor(
    @Inject(LoggerKey) private logger: Logger,
    private readonly parser: ParserRepository,
  ) {}

  async csv(file: Express.Multer.File): Promise<ResultCsvFileStructures> {
    const workBook = await this.parser.read(file);

    const resultGetFromFile: ResultCsvFileStructures = [];

    workBook.getWorksheet().eachRow((row, number) => {
      if (row.number !== 1) {
        const cellValues = this.handleCell(row);
        resultGetFromFile.push(cellValues);
      }
    });

    this.logger.info('CSV file parsed successfully');
    return resultGetFromFile;
  }

  handleCell(row: ExcelJS.Row) {
    const csvResponse = this.initEmptyCsvFile();
    row.eachCell((cell, colNumber) => {
      switch (colNumber) {
        case 1:
          csvResponse.year = Number(cell.value);
          break;
        case 2:
          csvResponse.title = String(cell.value);
          break;
        case 3:
          csvResponse.studios = String(cell.value);
          break;
        case 4:
          csvResponse.producers = String(cell.value);
          break;
        case 5:
          csvResponse.winner = String(cell.value) as Winner;
          break;
        default:
          console.log('Invalid column number');
          break;
      }
    });
    return csvResponse;
  }

  initEmptyCsvFile(): ResultCsvFileStructure {
    return {
      year: undefined,
      title: '',
      studios: '',
      producers: '',
      winner: 'no',
    };
  }
}
