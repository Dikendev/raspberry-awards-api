import { Module } from '@nestjs/common';
import { MovieModule } from '../domain/entity/movie/movie.module';
import { ProducersModule } from '../domain/entity/producer/producers.module';
import { StudioModule } from '../domain/entity/studio/studio.module';
import { PopulateDatabaseService } from './when-file-is-readed/populate-database/populate-database.service';

@Module({
  imports: [MovieModule, ProducersModule, StudioModule],
  providers: [PopulateDatabaseService],
  controllers: [],
  exports: [PopulateDatabaseService],
})
export class PopulateDatabaseModule {}
