import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Studio, StudioDocument } from './schemas/studio.schema';
import { Model } from 'mongoose';
import { CreateStudioDto } from './dtos/create-studio.dto';

@Injectable()
export class StudioService {
  constructor(
    @InjectModel(Studio.name) private studioModel: Model<StudioDocument>,
  ) {}

  async create(createStudioDto: CreateStudioDto): Promise<StudioDocument> {
    const createdStudio = new this.studioModel(createStudioDto);
    return createdStudio.save();
  }
}
