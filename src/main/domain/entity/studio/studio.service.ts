import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Studio, StudioDocument } from './schemas/studio.schema';
import { Model, Types } from 'mongoose';
import { CreateStudioDto } from './dtos/create-studio.dto';
import { NotFoundException } from '../../../../infrastructure/exceptions/filter/app/not-found.exception';
import { UpdateStudioDto } from './dtos/update-studio.dto';
import { ProducersService } from '../producer/producers.service';

interface UpdateStudioData {
  name?: string;
  moviesId?: string[];
  $addToSet?: { producers: string };
}

@Injectable()
export class StudioService {
  constructor(
    @InjectModel(Studio.name) private studioModel: Model<Studio>,
    @Inject(forwardRef(() => ProducersService))
    private readonly producerService: ProducersService,
  ) {}

  async create(createStudioDto: CreateStudioDto): Promise<StudioDocument> {
    const alreadyExist = await this.findByName(createStudioDto.name);

    if (!alreadyExist) {
      return await new this.studioModel(createStudioDto).save();
    }

    return alreadyExist;
  }

  async findByName(name: string) {
    return this.studioModel.findOne({ name }).exec();
  }

  async createOrUpdate(createStudioDto: CreateStudioDto): Promise<Studio> {
    const { name } = createStudioDto;

    const studio = await this.studioModel.findOne({ name }).exec();

    if (!studio) return this.create(createStudioDto);

    await studio.save();
    return studio;
  }

  async findAll(): Promise<any[]> {
    const studios = await this.studioModel.find().populate('movies').exec();
    return studios;
  }

  findManyByIds(ids: string[]) {
    return this.studioModel.find({
      _id: { $in: ids },
    });
  }

  async findById(id: string) {
    const studio = await this.studioModel.findById(id).exec();

    if (!studio) {
      throw new NotFoundException(`Studio with ID ${id} not found`);
    }

    return studio;
  }

  async update(id: string, updateStudioDto: UpdateStudioDto) {
    const { name, moviesId, producerId } = updateStudioDto;
    const isValidObjectId = Types.ObjectId.isValid(producerId);

    const updateData: UpdateStudioData = {
      name,
      moviesId,
    };

    if (producerId) {
      if (!isValidObjectId) {
        throw new NotFoundException(`Id not valid ${producerId}`);
      }

      const producer = await this.producerService.findById(producerId);

      if (!producer) return;

      updateData.$addToSet = { producers: producerId };
    }

    const studio = await this.studioModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    // await this.producerService.update(producerId, { studios: [id] });

    if (!studio) {
      throw new NotFoundException(`Studio with ID ${id} not found`);
    }

    return studio;
  }

  async updateMany(studiosId: Types.ObjectId[], producerId: Types.ObjectId) {
    const studios = await this.studioModel
      .updateMany({
        _id: { $in: studiosId },
        $push: { producers: producerId },
      })
      .exec();

    if (!studios) {
      throw new NotFoundException(`Studios with ID ${studiosId} not found`);
    }

    return studios;
  }

  async updateProducersToStudios(
    studiosId: Types.ObjectId[],
    producerId: Types.ObjectId,
  ): Promise<any> {
    const updatedMany = await this.updateMany(studiosId, producerId);

    if (!updatedMany) {
      throw new NotFoundException(`Studios with ID ${studiosId} not found`);
    }

    return updatedMany;
  }

  async delete(id: string) {
    const studio = await this.studioModel.findByIdAndDelete(id).exec();

    if (!studio) {
      throw new NotFoundException(`Studio with ID ${id} not found`);
    }

    return `Studio with id:${id} deleted successfully`;
  }

  async exists(id: string) {
    return this.studioModel.exists({ _id: id });
  }
}
