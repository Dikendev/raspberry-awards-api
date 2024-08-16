import { Test, TestingModule } from '@nestjs/testing';
import { FileParserService } from '../file-parser.service';
import {
  Logger,
  LoggerKey,
} from '../../../../external/logger/domain/logger.repository';
import { ParserRepository } from '../../../../external/excel-js/repository/parser-repository';
import * as ExcelJS from 'exceljs';

describe('FileParserService', () => {
  let service: FileParserService;
  let logger: Logger;
  let parserRepository: ParserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileParserService,
        { provide: LoggerKey, useValue: { info: jest.fn(), error: jest.fn() } },
        { provide: ParserRepository, useValue: { read: jest.fn() } },
      ],
    }).compile();

    service = module.get<FileParserService>(FileParserService);
    logger = module.get<Logger>(LoggerKey);
    parserRepository = module.get<ParserRepository>(ParserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should logger be defined', () => {
    expect(logger).toBeDefined();
  });

  it('should parserRepository be defined', () => {
    expect(parserRepository).toBeDefined();
  });

  describe('handleCell', () => {
    it('should parse a row with valid data correctly', () => {
      const mockRow = {
        eachCell: (callback: (cell: any, colNumber: number) => void) => {
          callback({ value: 2024 }, 1);
          callback({ value: "Can't Stop the Music" }, 2);
          callback({ value: 'Associated Film Distribution' }, 3);
          callback({ value: 'Allan Carr' }, 4);
          callback({ value: 'yes' }, 5);
        },
      } as ExcelJS.Row;

      const result = service.handleCell(mockRow);

      expect(result.year).toBe(2024);
      expect(result.title).toBe("Can't Stop the Music");
      expect(result.studios).toBe('Associated Film Distribution');
      expect(result.producers).toBe('Allan Carr');
      expect(result.winner).toBe('yes');
    });

    it('should handle invalid column numbers gracefully', () => {
      const mockRow = {
        eachCell: (callback: (cell: any, colNumber: number) => void) => {
          callback({ value: 2024 }, 6);
        },
      } as ExcelJS.Row;

      const result = service.handleCell(mockRow);

      expect(result.year).toBeUndefined();
      expect(result.title).toBe('');
      expect(result.studios).toBe('');
      expect(result.producers).toBe('');
      expect(result.winner).toBe('no');
    });

    it('should handle missing values gracefully', () => {
      const mockRow = {
        eachCell: (callback: (cell: any, colNumber: number) => void) => {
          callback({ value: null }, 1);
          callback({ value: null }, 2);
          callback({ value: null }, 3);
          callback({ value: null }, 4);
          callback({ value: null }, 5);
        },
      } as ExcelJS.Row;

      const result = service.handleCell(mockRow);

      expect(result.year).toBe(0);
      expect(result.title).toBe('null');
      expect(result.studios).toBe('null');
      expect(result.producers).toBe('null');
      expect(result.winner).toBe('null');
    });
  });

  describe('initEmptyCsvFile', () => {
    it('should return an empty csv file structure', () => {
      const result = service.initEmptyCsvFile();
      const expected = {
        year: undefined,
        title: '',
        studios: '',
        producers: '',
        winner: 'no',
      };
      expect(result).toEqual(expected);
    });
  });
});
