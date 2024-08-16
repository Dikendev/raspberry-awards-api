import { Module } from '@nestjs/common';
import { FileParserService } from './file-parser.service';
import { ExcelJsModule } from '../../../external/excel-js/excel-js.module';
import { FileUploadController } from '../../ports/file-upload.controller';

@Module({
  imports: [ExcelJsModule],
  providers: [FileParserService],
  controllers: [FileUploadController],
  exports: [FileParserService],
})
export class FileParserModule {}
