import { Module } from '@nestjs/common';
import { StudioService } from './studio.service';
import { StudioController } from './studio.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StudioSchema } from './schemas/studio.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'studios', schema: StudioSchema }]),
  ],
  providers: [StudioService],
  controllers: [StudioController],
})
export class StudioModule {}
