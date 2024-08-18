import { Module } from '@nestjs/common';
import { MovieModule } from './entity/movie/movie.module';
import { StudioModule } from './entity/studio/studio.module';
import { ProducersModule } from './entity/producer/producers.module';

@Module({
  imports: [MovieModule, StudioModule, ProducersModule],
  providers: [],
  controllers: [],
  exports: [],
})
export class DomainModule {}
