import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class TerminusLoggerService extends ConsoleLogger {
  error(message: any, stack?: string, context?: string): void;
  error(message: any, ...optionalParams: any[]): void;
  error(
    message: unknown,
    stack?: unknown,
    context?: unknown,
    ...rest: unknown[]
  ): void {
    super.error(message, stack, context, ...rest);
  }
}
