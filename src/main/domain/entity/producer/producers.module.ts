import { forwardRef, Module } from '@nestjs/common';
import { ProducersService } from './producers.service';
import { ProducersController } from './producers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Producer, ProducerSchema } from './schemas/producer.schema';
import { StudioModule } from '../studio/studio.module';
import { MovieModule } from '../movie/movie.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Producer.name, schema: ProducerSchema },
    ]),
    forwardRef(() => StudioModule),
    forwardRef(() => MovieModule),
  ],
  controllers: [ProducersController],
  providers: [ProducersService],
  exports: [ProducersService],
})
export class ProducersModule {}
