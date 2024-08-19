import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsService } from '../analytics.service';
import { ProducersService } from '../../../domain/entity/producer/producers.service';

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let producersService: ProducersService;

  const mockProducersService = {
    findAll: jest.fn(),
    getProducerMovieCounts: jest.fn(),
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
      ],
    }).compile();

    service = module.get<AnalyticsService>(AnalyticsService);
    producersService = module.get<ProducersService>(ProducersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be producersService defined', () => {
    expect(producersService).toBeDefined();
  });

  describe('getProducerWithLargestGap', () => {
    it('should return the producer with the largest gap between wins', async () => {
      mockProducersService.findAll.mockResolvedValue(mockProducers);

      const result = await service.getProducerWithLargestGap();
      expect(result).toEqual({
        producer: mockProducers[0],
        largestGap: 10,
      });
    });
  });

  describe('getProducerWithFastestWins', () => {
    it('should return the producer with the fastest consecutive wins', async () => {
      mockProducersService.findAll.mockResolvedValue(mockProducers);

      const result = await service.getProducerWithFastestWins();
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

      const result = await service.getProducerMovieCounts();
      expect(result).toEqual(mockMovieCounts);
    });
  });
});
