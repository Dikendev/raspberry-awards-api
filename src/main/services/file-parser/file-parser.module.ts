import { Module } from '@nestjs/common';
import { FileParserService } from './file-parser.service';
import { ExcelJsModule } from '../../../external/excel-js/excel-js.module';
import { FileUploadController } from '../../ports/file-upload.controller';
import { PopulateDatabaseModule } from '../../use-cases/populate-database.module';

@Module({
  imports: [ExcelJsModule, PopulateDatabaseModule],
  providers: [FileParserService],
  controllers: [FileUploadController],
  exports: [FileParserService],
})
export class FileParserModule {}
