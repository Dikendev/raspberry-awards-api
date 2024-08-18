import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';
import { MinimalError } from './zod-error.interface';

@Catch(ZodError)
export class ZodFilter<T extends ZodError> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = 409;

    const minimalError = this.minimalError(exception);
    this.responseFormat(response, status, minimalError);
  }

  private minimalError(exception: ZodError): MinimalError[] {
    return exception.errors.map((error: any) => ({
      param: error.path[error.path.length - 1],
      expected: error.expected,
      message: error.message,
    }));
  }

  private responseFormat(
    response: Response<any, Record<string, any>>,
    status: number,
    minimalError: MinimalError[],
  ) {
    response.status(status).json({
      errors: minimalError,
      statusCode: status,
    });
  }
}
