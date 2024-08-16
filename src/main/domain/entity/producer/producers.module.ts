import { Module } from '@nestjs/common';
import { ProducersService } from './producers.service';
import { ProducersController } from './producers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProducerSchema } from './schemas/producer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Producer', schema: ProducerSchema }]),
  ],
  controllers: [ProducersController],
  providers: [ProducersService],
})
export class ProducersModule {}
