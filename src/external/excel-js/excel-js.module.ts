import { Module } from '@nestjs/common';
import { ExcelJsService } from './excel-js.service';
import { ParserRepository } from './repository/parser-repository';

/**
 * @description
 * This module is responsible for providing the infrastructure for the file handler.
 */
@Module({
  providers: [{ provide: ParserRepository, useClass: ExcelJsService }],
  exports: [ParserRepository],
})
export class ExcelJsModule {}
