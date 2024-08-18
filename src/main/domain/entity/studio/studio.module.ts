import { forwardRef, Module } from '@nestjs/common';
import { StudioService } from './studio.service';
import { StudioController } from './studio.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Studio, StudioSchema } from './schemas/studio.schema';
import { ProducersModule } from '../producer/producers.module';

@Module({
  imports: [
    forwardRef(() => ProducersModule),
    MongooseModule.forFeature([{ name: Studio.name, schema: StudioSchema }]),
  ],
  providers: [StudioService],
  controllers: [StudioController],
  exports: [StudioService],
})
export class StudioModule {}
