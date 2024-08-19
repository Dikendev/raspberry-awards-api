import { Test, TestingModule } from '@nestjs/testing';
import { ExcelJsService } from '../excel-js.service';
import { Logger, LoggerKey } from '../../logger/domain/logger.repository';
import * as ExcelJS from 'exceljs';
import { _CSV_OPTIONS } from '../constants/option.constant';
import { Readable } from 'stream';

describe('ExceljsService', () => {
  let service: ExcelJsService;
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExcelJsService,
        { provide: LoggerKey, useValue: { info: jest.fn(), error: jest.fn() } },
      ],
    }).compile();

    service = module.get<ExcelJsService>(ExcelJsService);
    logger = module.get<Logger>(LoggerKey);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should logger be defined', () => {
    expect(logger).toBeDefined();
  });

  describe('read', () => {
    it('should read a file and return a workbook', async () => {
      const file: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'test.csv',
        encoding: '7bit',
        mimetype: 'text/csv',
        buffer: Buffer.from('name,age\nJohn,30\nDoe,40'),
        size: 1024,
        stream: null,
        destination: '',
        filename: '',
        path: '',
      };

      const result = await service.read(file);

      expect(logger.info).toHaveBeenCalledWith('Reading CSV file');
      expect(logger.info).toHaveBeenCalledWith('File read successfully');

      expect(result).toBeInstanceOf(ExcelJS.Workbook);
    });

    it('should log and error if reading fails', async () => {
      const file: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'test.csv',
        encoding: '7bit',
        mimetype: 'text/csv',
        buffer: Buffer.from('name,age\nJohn,30\nDoe,40'),
        size: 1024,
        stream: null,
        destination: '',
        filename: '',
        path: '',
      };

      try {
        await service.read(file);
      } catch (error) {
        expect(logger.error).toHaveBeenCalledWith(
          'Error reading file',
          new Error('Error reading file'),
        );
      }
    });
  });

  describe('setCsvOptions', () => {
    it('should return CSV options', () => {
      const options = service.setCsvOptions();

      const expected = { parserOptions: _CSV_OPTIONS };
      expect(options).toEqual(expected);
    });
  });

  describe('bufferToStream', () => {
    it('should convert buffer to stream', () => {
      const fileMock = 'name,age\nJohn,30\nDoe,40';
      const buffer = Buffer.from(fileMock);
      const stream = service.bufferToStream(buffer);

      expect(stream).toBeInstanceOf(Readable);

      let data = '';
      stream.on('data', (chunk) => {
        data += chunk;
      });

      stream.on('end', () => {
        expect(data).toBe(fileMock);
      });

      stream.on('error', (error) => {
        expect(error).toBeUndefined;
      });

      stream.read();
    });

    it('should return an empty stream if buffer is empty', () => {
      const buffer = Buffer.from('');
      const stream = service.bufferToStream(buffer);

      expect(stream).toBeInstanceOf(Readable);

      let data = '';
      stream.on('data', (chunk) => {
        data += chunk;
      });

      stream.on('end', () => {
        expect(data).toBe('');
      });

      stream.on('error', (error) => {
        expect(error).toBeUndefined;
      });

      stream.read();
    });
  });
});
