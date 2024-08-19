import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { MovieService } from '../../domain/entity/movie/movie.service';
import { ProducersService } from '../../domain/entity/producer/producers.service';
import { StudioService } from '../../domain/entity/studio/studio.service';
import {
  ResultCsvFileStructure,
  ResultCsvFileStructures,
  Winner,
} from '../file-parser/interfaces/csv.interface';
import { ParserRepository } from '../../../external/excel-js/repository/parser-repository';
import * as ExcelJS from 'exceljs';
import {
  Logger,
  LoggerKey,
} from '../../../external/logger/domain/logger.repository';
import mongoose from 'mongoose';

@Injectable()
export class PopulateDatabaseService implements OnModuleInit {
  constructor(
    @Inject(LoggerKey) private logger: Logger,
    private readonly movieService: MovieService,
    private readonly producer: ProducersService,
    private readonly studioService: StudioService,
    private readonly parser: ParserRepository,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.populateDataBaseHandler();
  }

  async populateDataBaseHandler(): Promise<void> {
    const hasData = await this.hasData();

    if (!hasData) {
      await this.csvLocal();
      return;
    }

    this.logger.debug(
      'Data already exists in the database, skipping CSV parsing and database population',
    );
  }

  async populateDataBase(
    resultGetFromFile: ResultCsvFileStructures,
  ): Promise<void> {
    for (let i = 0; i < resultGetFromFile.length; i++) {
      const producers = this.convertStringsWithSeparatorToArray(
        resultGetFromFile[i].producers,
      );

      for (let j = 0; j < producers.length; j++) {
        const producer = await this.producer.create({
          name: producers[j],
        });

        const studio = await this.studioService.create({
          name: resultGetFromFile[i].studios,
        });

        await this.movieService.create({
          year: resultGetFromFile[i].year,
          title: resultGetFromFile[i].title,
          studioId: studio.id,
          producerId: producer.id,
          winner: resultGetFromFile[i].winner,
        });
      }
    }
    this.logger.debug('Database populated successfully');
  }

  async csvLocal(): Promise<ResultCsvFileStructures> {
    try {
      const workBook = await this.parser.readLocal();
      return this.readFile(workBook);
    } catch (error) {
      this.logger.error('Error reading file', error);
      throw error;
    }
  }

  async csv(file: Express.Multer.File): Promise<ResultCsvFileStructures> {
    this.logger.debug(`Reading file: ${file.originalname}`);
    try {
      const workBook = await this.parser.read(file);
      return this.readFile(workBook);
    } catch (error) {
      this.logger.error('Error reading file', error);
      throw new HttpException(
        'Error reading file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async readFile(workBook: ExcelJS.Workbook): Promise<ResultCsvFileStructures> {
    this.logger.info('Starting data extraction from CSV file');

    const resultGetFromFile: ResultCsvFileStructures =
      this.extractingDataRowFromWorkbook(workBook);

    this.missingParamError(resultGetFromFile);

    this.logger.debug('CSV file parsed successfully');

    await this.populateDataBase(resultGetFromFile);
    return resultGetFromFile;
  }

  extractingDataRowFromWorkbook(
    workBook: ExcelJS.Workbook,
  ): ResultCsvFileStructures {
    const resultGetFromFile: ResultCsvFileStructures = [];

    workBook.getWorksheet().eachRow((row, _) => {
      if (row.number !== 1) {
        const cellValues = this.handleCell(row);
        resultGetFromFile.push(cellValues);
      }
    });

    return resultGetFromFile;
  }

  convertStringsWithSeparatorToArray(input: string): string[] {
    return input
      .split(/,\s*|and\s+/)
      .map((item) => item.trim())
      .filter((item) => item !== '');
  }

  handleCell(row: ExcelJS.Row): ResultCsvFileStructure {
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

  missingParamError(resultCsvFileStructures: ResultCsvFileStructures) {
    resultCsvFileStructures.forEach((resultCsvFileStructure) => {
      if (this.checkForMissingParam(resultCsvFileStructure)) {
        this.throwMissingParamException();
      }
    });
  }

  throwMissingParamException(): void {
    this.logger.error('Missing parameters in the CSV file or invalid CSV file');
    throw new HttpException(
      'Missing parameters in the CSV file or invalid csv file',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  checkForMissingParam(
    resultCsvFileStructure: ResultCsvFileStructure,
  ): boolean {
    if (
      !resultCsvFileStructure.year ||
      resultCsvFileStructure.year === Infinity ||
      !resultCsvFileStructure.title ||
      !resultCsvFileStructure.studios ||
      !resultCsvFileStructure.producers ||
      !resultCsvFileStructure.winner
    ) {
      return true;
    }
    return false;
  }

  async hasData(): Promise<boolean> {
    const count = await this.movieService.count();
    return count > 0;
  }

  async wipeDataBase(): Promise<string> {
    try {
      await mongoose.connect(process.env.DATABASE_URL, {});
      await mongoose.connection.db.dropDatabase();
      this.logger.info('Database wiped');
      return `Database wiped`;
    } catch (error) {
      console.error(error);
    }
  }

  private initEmptyCsvFile(): ResultCsvFileStructure {
    return {
      year: Infinity,
      title: undefined,
      studios: undefined,
      producers: undefined,
      winner: 'no',
    };
  }
}
