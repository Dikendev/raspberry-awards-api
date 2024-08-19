import { Test, TestingModule } from '@nestjs/testing';
import * as ExcelJS from 'exceljs';
import { PopulateDatabaseService } from '../populate-database.service';
import { MovieService } from '../../../domain/entity/movie/movie.service';
import { ProducersService } from '../../../domain/entity/producer/producers.service';
import { StudioService } from '../../../domain/entity/studio/studio.service';
import { ParserRepository } from '../../../../external/excel-js/repository/parser-repository';
import {
  Logger,
  LoggerKey,
} from '../../../../external/logger/domain/logger.repository';
import { Winner } from '../interfaces/csv.interface';

describe('PopulateDatabaseService E2E', () => {
  let service: PopulateDatabaseService;
  let movieService: MovieService;
  let producersService: ProducersService;
  let studioService: StudioService;
  let parserRepository: ParserRepository;
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PopulateDatabaseService,
        {
          provide: MovieService,
          useValue: { create: jest.fn(), count: jest.fn() },
        },
        { provide: ProducersService, useValue: { create: jest.fn() } },
        { provide: StudioService, useValue: { create: jest.fn() } },
        {
          provide: ParserRepository,
          useValue: { readLocal: jest.fn(), read: jest.fn() },
        },
        {
          provide: LoggerKey,
          useValue: { debug: jest.fn(), error: jest.fn(), info: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<PopulateDatabaseService>(PopulateDatabaseService);
    movieService = module.get<MovieService>(MovieService);
    producersService = module.get<ProducersService>(ProducersService);
    studioService = module.get<StudioService>(StudioService);
    parserRepository = module.get<ParserRepository>(ParserRepository);
    logger = module.get<Logger>(LoggerKey);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should movieService be defined', () => {
    expect(movieService).toBeDefined();
  });

  it('should producersService be defined', () => {
    expect(producersService).toBeDefined();
  });

  it('should studioService be defined', () => {
    expect(studioService).toBeDefined();
  });

  it('should parserRepository be defined', () => {
    expect(parserRepository).toBeDefined();
  });

  it('should logger be defined', () => {
    expect(logger).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should call csvLocal if no data exists in the database', async () => {
      jest.spyOn(service, 'hasData').mockResolvedValue(false);
      const csvLocalSpy = jest.spyOn(service, 'csvLocal').mockResolvedValue([]);

      await service.onModuleInit();

      expect(service.hasData).toHaveBeenCalled();
      expect(csvLocalSpy).toHaveBeenCalled();
    });

    it('should not call csvLocal if data exists in the database', async () => {
      jest.spyOn(service, 'hasData').mockResolvedValue(true);
      const csvLocalSpy = jest.spyOn(service, 'csvLocal').mockResolvedValue([]);

      await service.onModuleInit();

      expect(service.hasData).toHaveBeenCalled();
      expect(csvLocalSpy).not.toHaveBeenCalled();
      expect(logger.debug).toHaveBeenCalledWith(
        'Data already exists in the database, skipping CSV parsing and database population',
      );
    });
  });

  describe('populateDataBase', () => {
    it('should populate the database with data from the CSV file', async () => {
      const resultGetFromFile = [
        {
          year: 2020,
          title: 'Movie Title',
          studios: 'Studio Name',
          producers: 'Producer Name',
          winner: 'yes' as Winner,
        },
      ];

      producersService.create = jest.fn().mockResolvedValue({ id: 1 });
      studioService.create = jest.fn().mockResolvedValue({ id: 1 });
      movieService.create = jest.fn().mockResolvedValue({});

      await service.populateDataBase(resultGetFromFile);

      expect(producersService.create).toHaveBeenCalledWith({
        name: 'Producer Name',
      });
      expect(studioService.create).toHaveBeenCalledWith({
        name: 'Studio Name',
      });
      expect(movieService.create).toHaveBeenCalledWith({
        year: 2020,
        title: 'Movie Title',
        studioId: 1,
        producerId: 1,
        winner: 'yes',
      });
    });
  });

  describe('hasData', () => {
    it('should return true if there is data in the database', async () => {
      movieService.count = jest.fn().mockResolvedValue(1);

      const result = await service.hasData();

      expect(result).toBe(true);
    });

    it('should return false if there is no data in the database', async () => {
      movieService.count = jest.fn().mockResolvedValue(0);

      const result = await service.hasData();

      expect(result).toBe(false);
    });
  });

  describe('populateDataBaseHandler', () => {
    it('should call csvLocal if there is no data in the database', async () => {
      jest.spyOn(service, 'hasData').mockResolvedValue(false);
      jest.spyOn(service, 'csvLocal').mockResolvedValue([]);

      await service.populateDataBaseHandler();

      expect(service.hasData).toHaveBeenCalled();
      expect(service.csvLocal).toHaveBeenCalled();
    });

    it('should not call csvLocal if there is data in the database', async () => {
      jest.spyOn(service, 'hasData').mockResolvedValue(true);
      jest.spyOn(service, 'csvLocal').mockResolvedValue([]);

      await service.populateDataBaseHandler();

      expect(service.hasData).toHaveBeenCalled();
      expect(service.csvLocal).not.toHaveBeenCalled();
    });
  });

  describe('convertToArray', () => {
    it('should convert a comma-separated string to an array', () => {
      const result = service.convertStringsWithSeparatorToArray(
        'Producer1, Producer2',
      );
      expect(result).toEqual(['Producer1', 'Producer2']);
    });

    it('should convert an "and" separated string to an array', () => {
      const result = service.convertStringsWithSeparatorToArray(
        'Producer1 and Producer2',
      );
      expect(result).toEqual(['Producer1', 'Producer2']);
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

  describe('csvLocal', () => {
    it('should read the local CSV file and return the parsed data', async () => {
      const workBook = new ExcelJS.Workbook();
      jest.spyOn(parserRepository, 'readLocal').mockResolvedValue(workBook);
      jest.spyOn(service, 'readFile').mockResolvedValue([]);

      const result = await service.csvLocal();

      expect(parserRepository.readLocal).toHaveBeenCalled();
      expect(service.readFile).toHaveBeenCalledWith(workBook);
      expect(result).toEqual([]);
    });
  });

  describe('readFile', () => {
    it('should read the workbook and return the parsed data', async () => {
      const workBook = new ExcelJS.Workbook();
      const worksheet = workBook.addWorksheet('Sheet1');
      worksheet.addRow(['Year', 'Title', 'Studios', 'Producers', 'Winner']);
      worksheet.addRow([
        2020,
        'Movie Title',
        'Studio Name',
        'Producer Name',
        'yes',
      ]);

      jest.spyOn(workBook, 'getWorksheet').mockReturnValue(worksheet);
      jest.spyOn(service, 'populateDataBase').mockImplementation(jest.fn());

      const result = await service.readFile(workBook);
      expect(result).toEqual([
        {
          year: 2020,
          title: 'Movie Title',
          studios: 'Studio Name',
          producers: 'Producer Name',
          winner: 'yes',
        },
      ]);
    });
  });

  describe('handleCell', () => {
    it('should handle a row and return the parsed data', () => {
      const row = {
        eachCell: jest.fn((callback) => {
          callback({ value: 2020 }, 1);
          callback({ value: 'Movie Title' }, 2);
          callback({ value: 'Studio Name' }, 3);
          callback({ value: 'Producer Name' }, 4);
          callback({ value: 'yes' }, 5);
        }),
      } as unknown as ExcelJS.Row;

      const result = service.handleCell(row);

      expect(result).toEqual({
        year: 2020,
        title: 'Movie Title',
        studios: 'Studio Name',
        producers: 'Producer Name',
        winner: 'yes',
      });
    });
  });
});
