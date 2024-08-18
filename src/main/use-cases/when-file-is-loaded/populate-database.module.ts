import { Module } from '@nestjs/common';
import { MovieModule } from '../../domain/entity/movie/movie.module';
import { ProducersModule } from '../../domain/entity/producer/producers.module';
import { StudioModule } from '../../domain/entity/studio/studio.module';
import { PopulateDatabaseService } from './populate-database.service';
import { FileUploadController } from '../../ports/file-upload.controller';
import { ExcelJsModule } from '../../../external/excel-js/excel-js.module';
import { WipeDatabaseController } from '../../ports/wipe-database/wipe-database.controller';

@Module({
  imports: [MovieModule, ProducersModule, StudioModule, ExcelJsModule],
  providers: [PopulateDatabaseService],
  controllers: [FileUploadController, WipeDatabaseController],
  exports: [PopulateDatabaseService],
})
export class PopulateDatabaseModule {}
