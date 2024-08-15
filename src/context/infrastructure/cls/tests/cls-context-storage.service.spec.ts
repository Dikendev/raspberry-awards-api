import { Test, TestingModule } from '@nestjs/testing';
import { ClsContextStorageService } from '../cls-context-storage.service';

describe('ClsContextStorageService', () => {
  let service: ClsContextStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClsContextStorageService],
    }).compile();

    service = module.get<ClsContextStorageService>(ClsContextStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
