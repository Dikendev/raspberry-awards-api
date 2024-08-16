import { Module } from '@nestjs/common';
import { StudioService } from './studio.service';
import { StudioController } from './studio.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Studio, StudioSchema } from './schemas/studio.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Studio.name, schema: StudioSchema }]),
  ],
  providers: [StudioService],
  controllers: [StudioController],
})
export class StudioModule {}
