import { Test, TestingModule } from '@nestjs/testing';

import * as ExcelJS from 'exceljs';
import { ParserRepository } from '../../../../external/excel-js/repository/parser-repository';
import { FileParserService } from '../file-parser.service';
import {
  Logger,
  LoggerKey,
} from '../../../../external/logger/domain/logger.repository';
import { PopulateDatabaseService } from '../../../use-cases/when-file-is-loaded/populate-database.service';
import { ResultCsvFileStructures } from '../interfaces/csv.interface';

describe('FileParserService', () => {
  let service: FileParserService;
  let parserRepository: ParserRepository;
  let logger: Logger;
  let populateDatabaseService: PopulateDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileParserService,
        {
          provide: ParserRepository,
          useValue: {
            readLocal: jest.fn(),
            read: jest.fn(),
          },
        },
        {
          provide: LoggerKey,
          useValue: {
            debug: jest.fn(),
            info: jest.fn(),
          },
        },
        {
          provide: PopulateDatabaseService,
          useValue: {
            hasData: jest.fn(),
            populateDataBase: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FileParserService>(FileParserService);
    parserRepository = module.get<ParserRepository>(ParserRepository);
    logger = module.get<Logger>(LoggerKey);
    populateDatabaseService = module.get<PopulateDatabaseService>(
      PopulateDatabaseService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should call csvLocal if no data exists in the database', async () => {
      jest.spyOn(populateDatabaseService, 'hasData').mockResolvedValue(false);
      const csvLocalSpy = jest.spyOn(service, 'csvLocal').mockResolvedValue([]);

      await service.onModuleInit();

      expect(populateDatabaseService.hasData).toHaveBeenCalled();
      expect(csvLocalSpy).toHaveBeenCalled();
    });

    it('should not call csvLocal if data exists in the database', async () => {
      jest.spyOn(populateDatabaseService, 'hasData').mockResolvedValue(true);
      const csvLocalSpy = jest.spyOn(service, 'csvLocal').mockResolvedValue([]);

      await service.onModuleInit();

      expect(populateDatabaseService.hasData).toHaveBeenCalled();
      expect(csvLocalSpy).not.toHaveBeenCalled();
      expect(logger.debug).toHaveBeenCalledWith(
        'Data already exists in the database. Skipping CSV parsing.',
      );
    });
  });

  describe('csvLocal', () => {
    it('should read local file and process it', async () => {
      const mockWorkbook = new ExcelJS.Workbook();
      jest.spyOn(parserRepository, 'readLocal').mockResolvedValue(mockWorkbook);
      const readFileSpy = jest.spyOn(service, 'readFile').mockResolvedValue([]);

      await service.csvLocal();

      expect(parserRepository.readLocal).toHaveBeenCalled();
      expect(readFileSpy).toHaveBeenCalledWith(mockWorkbook);
    });
  });

  describe('csv', () => {
    it('should read uploaded file and process it', async () => {
      const mockFile = {} as Express.Multer.File;
      const mockWorkbook = new ExcelJS.Workbook();
      jest.spyOn(parserRepository, 'read').mockResolvedValue(mockWorkbook);
      const readFileSpy = jest.spyOn(service, 'readFile').mockResolvedValue([]);

      await service.csv(mockFile);

      expect(parserRepository.read).toHaveBeenCalledWith(mockFile);
      expect(readFileSpy).toHaveBeenCalledWith(mockWorkbook);
    });
  });

  describe('readFile', () => {
    it('should process the workbook and populate the database', async () => {
      const mockWorkbook = new ExcelJS.Workbook();
      const mockWorksheet = mockWorkbook.addWorksheet('Sheet1');
      mockWorksheet.addRow(['Year', 'Title', 'Studios', 'Producers', 'Winner']);
      mockWorksheet.addRow([2021, 'Title1', 'Studio1', 'Producer1', 'yes']);
      mockWorksheet.addRow([2022, 'Title2', 'Studio2', 'Producer2', 'no']);

      const result = await service.readFile(mockWorkbook);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        year: 2021,
        title: 'Title1',
        studios: 'Studio1',
        producers: 'Producer1',
        winner: 'yes',
      });
      expect(result[1]).toEqual({
        year: 2022,
        title: 'Title2',
        studios: 'Studio2',
        producers: 'Producer2',
        winner: 'no',
      });
      expect(logger.debug).toHaveBeenCalledWith('CSV file parsed successfully');
      expect(populateDatabaseService.populateDataBase).toHaveBeenCalledWith(
        result,
      );
    });
  });

  describe('isValueRepeated', () => {
    it('should return true if a value is repeated', () => {
      const data: ResultCsvFileStructures = [
        {
          year: 2021,
          title: 'Title1',
          studios: 'Studio1',
          producers: 'Producer1',
          winner: 'yes',
        },
        {
          year: 2022,
          title: 'Title2',
          studios: 'Studio1',
          producers: 'Producer2',
          winner: 'no',
        },
      ];

      const result = service.isValueRepeated(data, 'studios');

      expect(result).toBe(true);
    });

    it('should return false if no value is repeated', () => {
      const data: ResultCsvFileStructures = [
        {
          year: 2021,
          title: 'Title1',
          studios: 'Studio1',
          producers: 'Producer1',
          winner: 'yes',
        },
        {
          year: 2022,
          title: 'Title2',
          studios: 'Studio2',
          producers: 'Producer2',
          winner: 'no',
        },
      ];

      const result = service.isValueRepeated(data, 'studios');

      expect(result).toBe(false);
    });
  });
});
