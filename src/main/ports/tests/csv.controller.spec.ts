import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadController } from '../file-upload.controller';
import { FileParserService } from '../../services/file-parser/file-parser.service';
import { INestApplication } from '@nestjs/common';
import { ResultCsvFileStructures } from '../../services/file-parser/interfaces/csv.interface';
import * as request from 'supertest';

describe('FileUploadController', () => {
  let app: INestApplication;
  let fileParserService: FileParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileUploadController],
      providers: [
        {
          provide: FileParserService,
          useValue: { csv: jest.fn() },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    fileParserService = module.get<FileParserService>(FileParserService);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should fileParserService be defined', () => {
    expect(fileParserService).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should call fileParserService.csv', async () => {
      const mockResult: ResultCsvFileStructures = [
        {
          year: 1995,
          title: 'test',
          studios: 'test',
          producers: 'test',
          winner: 'yes',
        },
      ];

      fileParserService.csv = jest.fn().mockResolvedValue(mockResult);

      await request(app.getHttpServer())
        .post('/upload-file/csv')
        .attach('file', Buffer.from('test file content'), 'test.csv')
        .expect(201)
        .expect(mockResult);

      expect(fileParserService.csv).toHaveBeenCalled();
    });
  });
});
