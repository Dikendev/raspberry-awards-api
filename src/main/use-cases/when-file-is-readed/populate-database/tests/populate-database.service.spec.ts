import { Test, TestingModule } from '@nestjs/testing';
import { PopulateDatabaseService } from '../populate-database.service';
import { MovieService } from '../../../../domain/entity/movie/movie.service';
import { ProducersService } from '../../../../domain/entity/producer/producers.service';
import { StudioService } from '../../../../domain/entity/studio/studio.service';
import { getModelToken } from '@nestjs/mongoose';
import { Producer } from '../../../../domain/entity/producer/schemas/producer.schema';
import { Movie } from '../../../../domain/entity/movie/schemas/movie.schema';
import { Studio } from '../../../../domain/entity/studio/schemas/studio.schema';
import { ResultCsvFileStructures } from '../../../../services/file-parser/interfaces/csv.interface';

describe('PopulateDatabaseService', () => {
  let service: PopulateDatabaseService;
  let movieService: MovieService;
  let producerService: ProducersService;
  let studioService: StudioService;

  const mockProducerService = {
    create: jest.fn().mockResolvedValue({ id: 'producerId' }),
  };

  const mockStudioService = {
    create: jest.fn().mockResolvedValue({ id: 'studioId' }),
  };

  const mockMovieService = {
    create: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PopulateDatabaseService,
        { provide: MovieService, useValue: mockMovieService },
        { provide: ProducersService, useValue: mockProducerService },
        { provide: StudioService, useValue: mockStudioService },
        {
          provide: getModelToken(Producer.name),
          useValue: {
            findOne: jest
              .fn()
              .mockReturnValue({ exec: jest.fn().mockReturnValue(null) }),
          },
        },
        { provide: getModelToken(Movie.name), useValue: Movie },
        {
          provide: getModelToken(Studio.name),
          useValue: {
            findOne: jest
              .fn()
              .mockReturnValue({ exec: jest.fn().mockReturnValue(null) }),
          },
        },
      ],
    }).compile();

    service = module.get<PopulateDatabaseService>(PopulateDatabaseService);
    movieService = module.get<MovieService>(MovieService);
    producerService = module.get<ProducersService>(ProducersService);
    studioService = module.get<StudioService>(StudioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should movieService be defined', () => {
    expect(movieService).toBeDefined();
  });

  it('should producerService be defined', () => {
    expect(producerService).toBeDefined();
  });

  it('should studioService be defined', () => {
    expect(studioService).toBeDefined();
  });

  describe('populateDataBase', () => {
    it('should return the right data to populate the database', async () => {
      const data: ResultCsvFileStructures = [
        {
          year: 1980,
          title: "Can't Stop the Music",
          studios: 'Associated Film Distribution',
          producers: 'Allan Carr',
          winner: 'yes',
        },
        {
          year: 1980,
          title: 'Cruising',
          studios: 'Lorimar Productions, United Artists',
          producers: 'Jerry Weintraub',
          winner: 'no',
        },
        {
          year: 1980,
          title: 'The Formula',
          studios: 'MGM, United Artists',
          producers: 'Steve Shagan',
          winner: 'no',
        },
        {
          year: 1980,
          title: 'Friday the 13th',
          studios: 'Paramount Pictures',
          producers: 'Sean S. Cunningham',
          winner: 'no',
        },
        {
          year: 1980,
          title: 'The Nude Bomb',
          studios: 'Universal Studios',
          producers: 'Jennings Lang',
          winner: 'no',
        },
        {
          year: 1980,
          title: 'The Jazz Singer',
          studios: 'Associated Film Distribution',
          producers: 'Jerry Leider',
          winner: 'no',
        },
        {
          year: 1980,
          title: 'Raise the Titanic',
          studios: 'Associated Film Distribution',
          producers: 'William Frye',
          winner: 'no',
        },
        {
          year: 1980,
          title: 'Saturn 3',
          studios: 'Associated Film Distribution',
          producers: 'Stanley Donen',
          winner: 'no',
        },
        {
          year: 1980,
          title: 'Windows',
          studios: 'United Artists',
          producers: 'Mike Lobell',
          winner: 'no',
        },
        {
          year: 1980,
          title: 'Xanadu',
          studios: 'Universal Studios',
          producers: 'Lawrence Gordon',
          winner: 'no',
        },
        {
          year: 1981,
          title: 'Mommie Dearest',
          studios: 'Paramount Pictures',
          producers: 'Frank Yablans',
          winner: 'yes',
        },
        {
          year: 1981,
          title: 'Endless Love',
          studios: 'Universal Studios, PolyGram',
          producers: 'Dyson Lovell',
          winner: 'no',
        },
        {
          year: 1981,
          title: "Heaven's Gate",
          studios: 'United Artists',
          producers: 'Joann Carelli',
          winner: 'no',
        },
      ];

      await service.populateDataBase(data);

      expect(mockProducerService.create).toHaveBeenCalled();
      expect(mockStudioService.create).toHaveBeenCalled();
      expect(mockMovieService.create).toHaveBeenCalled();
    });
  });
});
