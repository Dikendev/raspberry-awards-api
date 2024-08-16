import { ArgumentsHost, HttpException } from '@nestjs/common';
import { HttpExceptionFilter } from './app/http-exception.filter';
import { Response } from 'express';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;
  let mockArgumentsHost: ArgumentsHost;
  let mockResponse: Response;

  beforeEach(() => {
    filter = new HttpExceptionFilter();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as any;

    mockArgumentsHost = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue(mockResponse),
    } as any;
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  it('should mockArgumentsHost be defined', () => {
    expect(mockArgumentsHost).toBeDefined();
  });

  describe('catch', () => {
    it('should handle HttpException and return response', () => {
      const mockException = new HttpException('Test Error', 400);

      filter.catch(mockException, mockArgumentsHost);

      expect(mockArgumentsHost.switchToHttp).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        statusCode: 400,
        message: 'Test Error',
        timestamp: expect.any(String),
      });
    });
  });
});
