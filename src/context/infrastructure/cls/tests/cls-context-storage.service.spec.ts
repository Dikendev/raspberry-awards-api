import { Test, TestingModule } from '@nestjs/testing';
import { ClsContextStorageService } from '../cls-context-storage.service';
import { ClsService } from 'nestjs-cls';

describe('ClsContextStorageService', () => {
  let service: ClsContextStorageService;
  let clsService: ClsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClsContextStorageService,
        {
          provide: ClsService,
          useValue: {
            setContextId: jest.fn(),
            getContextId: jest.fn(),
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ClsContextStorageService>(ClsContextStorageService);
    clsService = module.get<ClsService>(ClsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should clsService be defined', () => {
    expect(clsService).toBeDefined();
  });
});
