import { Test, TestingModule } from '@nestjs/testing';
import { StudioService } from '../studio.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Studio, StudioSchema } from '../schemas/studio.schema';

describe('StudioService', () => {
  let service: StudioService;
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => ({
            uri: mongod.getUri(),
          }),
        }),
        MongooseModule.forFeature([
          { name: Studio.name, schema: StudioSchema },
        ]),
      ],
      providers: [
        StudioService,
        {
          provide: getModelToken(Studio.name),
          useValue: {},
        },
        {
          provide: StudioService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<StudioService>(StudioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
