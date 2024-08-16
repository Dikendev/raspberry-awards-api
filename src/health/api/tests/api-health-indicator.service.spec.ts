import { Test, TestingModule } from '@nestjs/testing';
import {
  _API_HEALTH_INDICATOR,
  _API_HEALTH_INDICATOR_MESSAGE,
  ApiHealthIndicatorService,
} from '../api-health-indicator.service';

describe('apiHealthIndicatorService', () => {
  let apiHealthIndicatorService: ApiHealthIndicatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiHealthIndicatorService],
    }).compile();

    apiHealthIndicatorService = module.get<ApiHealthIndicatorService>(
      ApiHealthIndicatorService,
    );
  });

  it('should be defined', () => {
    expect(apiHealthIndicatorService).toBeDefined();
  });

  it('should return health status when uptime is greater than 0', async () => {
    jest.spyOn(process, 'uptime').mockReturnValue(100);
    const result = await apiHealthIndicatorService.isHealthy('api');

    expect(result).toEqual({
      api: {
        status: 'up',
        uptime: 100,
      },
    });
  });

  it('should throw an error when uptime is 0', async () => {
    jest.spyOn(process, 'uptime').mockReturnValue(0);

    try {
      await apiHealthIndicatorService.isHealthy(_API_HEALTH_INDICATOR);
    } catch (error) {
      expect(error.message).toEqual(_API_HEALTH_INDICATOR_MESSAGE);
    }
  });
});
