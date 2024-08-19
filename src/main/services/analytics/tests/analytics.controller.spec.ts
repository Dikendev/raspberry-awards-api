import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsController } from '../analytics.controller';
import { AnalyticsService } from '../analytics.service';

describe('AnalyticsController', () => {
  let analyticsController: AnalyticsController;
  let analyticsService: AnalyticsService;

  const mockAnalyticsService = {
    getProducerWithLargestGap: jest.fn(),
    getProducerWithFastestWins: jest.fn(),
    getProducerMovieCounts: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalyticsController],
      providers: [
        {
          provide: AnalyticsService,
          useValue: mockAnalyticsService,
        },
      ],
    }).compile();

    analyticsController = module.get<AnalyticsController>(AnalyticsController);
    analyticsService = module.get<AnalyticsService>(AnalyticsService);
  });

  it('should be defined', () => {
    expect(analyticsController).toBeDefined();
  });

  it('should analyticsService be defined', () => {
    expect(analyticsService).toBeDefined();
  });

  describe('getProducerWithLargestGap', () => {
    it('should return the producer with the largest gap between movies', async () => {
      const result: any = { producer: 'Producer A', gap: 10 };
      mockAnalyticsService.getProducerWithLargestGap.mockResolvedValue(result);

      expect(await analyticsController.getProducerWithLargestGap()).toEqual(
        result,
      );
      expect(mockAnalyticsService.getProducerWithLargestGap).toHaveBeenCalled();
    });
  });

  describe('getProducerWithFastestWins', () => {
    it('should return the producer with the fastest wins', async () => {
      const result: any = { producer: 'Producer B', wins: 5 };
      mockAnalyticsService.getProducerWithFastestWins.mockResolvedValue(result);

      expect(await analyticsController.getProducerWithFastestWins()).toEqual(
        result,
      );
      expect(
        mockAnalyticsService.getProducerWithFastestWins,
      ).toHaveBeenCalled();
    });
  });

  describe('getProducerMovieCounts', () => {
    it('should return the producer with the most movies count', async () => {
      const result: any = {
        producer: 'Producer C',
        count: 20,
      };
      mockAnalyticsService.getProducerMovieCounts.mockResolvedValue(result);

      expect(await analyticsController.getProducerMovieCounts()).toEqual(
        result,
      );
      expect(mockAnalyticsService.getProducerMovieCounts).toHaveBeenCalled();
    });
  });
});
