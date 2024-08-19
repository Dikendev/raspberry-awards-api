import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsService } from '../analytics.service';
import { ProducersService } from '../../../domain/entity/producer/producers.service';
import { MovieService } from '../../../domain/entity/movie/movie.service';
import { StudioService } from '../../../domain/entity/studio/studio.service';

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let producersService: ProducersService;
  let movieService: MovieService;
  let studioService: StudioService;

  const mockProducersService = {
    findAll: jest.fn(),
    getProducerMovieCounts: jest.fn(),
  };

  const movieServiceMock = {
    findAll: jest.fn(),
  };

  const studioServiceMock = {
    findAll: jest.fn(),
  };

  const mockProducers = [
    {
      name: 'Producer 1',
      movies: [
        { year: 2000, winner: 'yes' },
        { year: 2010, winner: 'yes' },
        { year: 2020, winner: 'no' },
      ],
    },
    {
      name: 'Producer 2',
      movies: [
        { year: 2005, winner: 'yes' },
        { year: 2015, winner: 'yes' },
      ],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalyticsService,
        { provide: ProducersService, useValue: mockProducersService },
        { provide: MovieService, useValue: movieServiceMock },
        { provide: StudioService, useValue: studioServiceMock },
      ],
    }).compile();

    service = module.get<AnalyticsService>(AnalyticsService);
    producersService = module.get<ProducersService>(ProducersService);
    movieService = module.get<MovieService>(MovieService);
    studioService = module.get<StudioService>(StudioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be producersService defined', () => {
    expect(producersService).toBeDefined();
  });

  it('should be movieService defined', () => {
    expect(movieService).toBeDefined();
  });

  it('should be studioService defined', () => {
    expect(studioService).toBeDefined();
  });

  describe('getProducerWithLargestGap', () => {
    it('should return the producer with the largest gap between wins', async () => {
      mockProducersService.findAll.mockResolvedValue(mockProducers);

      const result = await service.producerWithLargestGap();
      expect(result).toEqual({
        producer: mockProducers[0],
        largestGap: 10,
      });
    });
  });

  describe('getProducerWithFastestWins', () => {
    it('should return the producer with the fastest consecutive wins', async () => {
      mockProducersService.findAll.mockResolvedValue(mockProducers);

      const result = await service.producerWithFastestWins();
      expect(result).toEqual({
        producer: mockProducers[0],
        fastestWins: 10,
      });
    });
  });

  describe('getProducerMovieCounts', () => {
    it('should return the movie counts for each producer', async () => {
      const mockMovieCounts = [
        { name: 'Producer 1', movieCount: 3 },
        { name: 'Producer 2', movieCount: 2 },
      ];
      mockProducersService.getProducerMovieCounts.mockResolvedValue(
        mockMovieCounts,
      );

      const result = await service.producerMovieCounts();
      expect(result).toEqual(mockMovieCounts);
    });
  });
});
