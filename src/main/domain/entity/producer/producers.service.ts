import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Producer, ProducerDocument } from './schemas/producer.schema';
import { Model, Types } from 'mongoose';
import { UpdateProducerDto } from './dtos/update-producer.dto';
import { MovieService } from '../movie/movie.service';
import { CreateProducerDto } from './dtos/create-producer.dto';
import { AnalyticsMovieCounts } from '../../../services/analytics/interfaces/analytics.interface';

@Injectable()
export class ProducersService {
  constructor(
    @InjectModel(Producer.name) private producerModel: Model<Producer>,
    @Inject(forwardRef(() => MovieService))
    private readonly movieService: MovieService,
  ) {}

  async create(
    createProducerDto: CreateProducerDto,
  ): Promise<ProducerDocument> {
    const alreadyExist = await this.findByName(createProducerDto.name);

    if (!alreadyExist) {
      return new this.producerModel(createProducerDto).save();
    }

    return alreadyExist;
  }

  async findByName(name: string) {
    return this.producerModel.findOne({ name }).exec();
  }

  async findAll(): Promise<ProducerDocument[]> {
    return this.producerModel.find().populate('movies').exec();
  }

  async findManyByIds(ids: string[]): Promise<ProducerDocument[]> {
    return this.producerModel.find({
      _id: { $in: ids },
    });
  }

  async findById(id: string): Promise<ProducerDocument> {
    const producer = await this.producerModel
      .findById(id)
      .populate({
        path: 'movies',
        populate: { path: 'studio' },
      })
      .exec();

    if (!producer) {
      throw new NotFoundException(`Producer with ID ${id} not found`);
    }
    return producer;
  }

  async update(
    id: string,
    updateDto: UpdateProducerDto,
  ): Promise<ProducerDocument> {
    const { name } = updateDto;

    const producer = await this.producerModel.findById(id).exec();
    if (!producer) {
      throw new NotFoundException(`Producer with ID ${id} not found`);
    }

    producer.name = name;
    await producer.save();

    return producer;
  }

  async updateStudioToProducers(
    producersId: string[],
    studioId: Types.ObjectId,
  ) {
    const producers = await this.producerModel
      .find({
        _id: { $in: producersId },
      })
      .exec();

    if (!producers.length) {
      throw new NotFoundException(`Producer with ID ${producersId} not found`);
    }

    const updatedProducer = await this.producerModel
      .updateMany(
        { _id: producers },
        {
          $push: { studios: studioId },
        },
      )
      .exec();

    return updatedProducer;
  }

  async delete(id: string) {
    const producer = await this.producerModel.findByIdAndDelete(id).exec();

    if (!producer) {
      throw new NotFoundException(`Producer with ID ${id} not found`);
    }

    await this.movieService.deleteProducerRelation(id);

    return `Producer with id:${id} deleted successfully`;
  }

  async exists(id: string) {
    return this.producerModel.exists({ _id: id });
  }

  async getProducerMovieCounts(): Promise<AnalyticsMovieCounts> {
    return this.producerModel.aggregate([
      {
        $project: {
          name: 1,
          movieCount: { $size: '$movies' },
        },
      },
    ]);
  }
}
