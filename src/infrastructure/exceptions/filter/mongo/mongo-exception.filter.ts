import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';
import { MongooseError } from 'mongoose';

@Catch(MongoError, MongooseError)
export class MongoExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';

    if (exception instanceof MongoError) {
      if (exception.code === 11000) {
        status = HttpStatus.CONFLICT;
        message = this.extractDuplicateKeyErrorMessage(exception);
      } else {
        status = HttpStatus.BAD_REQUEST;
        message = exception.message;
      }
    }

    if (exception instanceof MongooseError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      error: message,
      timestamp: new Date().toISOString(),
    });
  }

  private extractDuplicateKeyErrorMessage(exception: MongoError): string {
    const errorMessage = exception.errmsg || '';
    const match = errorMessage.match(
      /collection: (\w+\.\w+) index: (\w+) dup key: \{ (.+) \}/,
    );
    if (match) {
      const [, collection, index, key] = match;
      return `Duplicate key error on collection ${collection}, index ${index}, key ${key}`;
    }
    return 'Duplicate key error';
  }
}
