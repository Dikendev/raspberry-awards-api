import { Module } from '@nestjs/common';
import { MovieModule } from '../../domain/entity/movie/movie.module';
import { ProducersModule } from '../../domain/entity/producer/producers.module';
import { StudioModule } from '../../domain/entity/studio/studio.module';
import { FileUploadController } from '../../ports/file-upload.controller';
import { ExcelJsModule } from '../../../external/excel-js/excel-js.module';
import { WipeDatabaseController } from '../../ports/wipe-database/wipe-database.controller';
import { PopulateDatabaseService } from './populate-database.service';

@Module({
  imports: [MovieModule, ProducersModule, StudioModule, ExcelJsModule],
  providers: [PopulateDatabaseService],
  controllers: [FileUploadController, WipeDatabaseController],
  exports: [PopulateDatabaseService],
})
export class PopulateDatabaseModule {}
