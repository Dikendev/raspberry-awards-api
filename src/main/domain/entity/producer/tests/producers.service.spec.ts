import { Test, TestingModule } from '@nestjs/testing';
import { ProducersService } from '../producers.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Producer, ProducerSchema } from '../schemas/producer.schema';
import { MovieService } from '../../movie/movie.service';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('ProducersService', () => {
  let service: ProducersService;
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
          { name: Producer.name, schema: ProducerSchema },
        ]),
      ],
      providers: [
        ProducersService,
        {
          provide: getModelToken(Producer.name),
          useValue: {},
        },
        {
          provide: MovieService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ProducersService>(ProducersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
