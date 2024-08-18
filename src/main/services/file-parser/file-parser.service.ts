import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
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
import { PopulateDatabaseService } from '../../use-cases/when-file-is-readed/populate-database/populate-database.service';

@Injectable()
export class FileParserService implements OnModuleInit {
  async onModuleInit() {
    await this.populateDataBaseHandler();
  }

  constructor(
    @Inject(LoggerKey) private logger: Logger,
    private readonly parser: ParserRepository,
    private readonly populateDatabaseService: PopulateDatabaseService,
  ) {}

  async csvLocal(): Promise<ResultCsvFileStructures> {
    this.logger.debug('Reading file');
    const workBook = await this.parser.readLocal();
    return this.readFile(workBook);
  }

  async csv(file: Express.Multer.File): Promise<ResultCsvFileStructures> {
    const workBook = await this.parser.read(file);
    return this.readFile(workBook);
  }

  async readFile(workBook: ExcelJS.Workbook) {
    this.logger.debug('Reading file');

    const resultGetFromFile: ResultCsvFileStructures = [];
    this.logger.debug('Starting data extraction from CSV file');

    workBook.getWorksheet().eachRow((row, number) => {
      if (row.number !== 1) {
        const cellValues = this.handleCell(row);
        resultGetFromFile.push(cellValues);
      }
    });

    this.logger.debug('CSV file parsed successfully');

    this.isValueRepeated(resultGetFromFile, 'studios');

    await this.populateDatabaseService.populateDataBase(resultGetFromFile);

    this.logger.debug('Database populated successfully');

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

  isValueRepeated(
    resultCsvFileStructures: ResultCsvFileStructures,
    keyToFind: keyof ResultCsvFileStructure,
  ): boolean {
    const times = new Map<string, number>();

    resultCsvFileStructures.forEach((value) => {
      const nameToFind = String(value[keyToFind]);

      if (nameToFind) {
        if (times.has(nameToFind)) {
          times.set(nameToFind, times.get(nameToFind)! + 1);
        } else {
          times.set(nameToFind, 1);
        }
      }
    });

    let hasMore = false;

    times.forEach((count) => {
      if (count > 1) {
        hasMore = true;
      }
    });

    return hasMore;
  }

  async populateDataBaseHandler() {
    const hasData = await this.populateDatabaseService.hasData();
    if (!hasData) {
      await this.csvLocal();
    } else {
      this.logger.debug(
        'Data already exists in the database. Skipping CSV parsing.',
      );
    }
  }
}
