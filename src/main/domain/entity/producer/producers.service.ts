import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Producer, ProducerDocument } from './schemas/producer.schema';
import { Model } from 'mongoose';
import { ProducerDtoType } from './dtos/create-producer.dto';
import { UpdateProducerDto } from './dtos/update-producer.dto';

@Injectable()
export class ProducersService {
  constructor(
    @InjectModel(Producer.name) private producerModel: Model<ProducerDocument>,
  ) {}

  create(createProducerDto: ProducerDtoType): Promise<ProducerDocument> {
    const createdProducer = new this.producerModel(createProducerDto);
    return createdProducer.save();
  }

  findAll() {
    return this.producerModel.find().exec();
  }

  async findOne(id: string) {
    const producer = await this.producerModel.findById(id).exec();

    if (!producer) {
      throw new NotFoundException(`Producer with ID ${id} not found`);
    }

    return producer;
  }

  async update(id: string, updateProducerDto: UpdateProducerDto) {
    const { name, studioId, movies } = updateProducerDto;
    const producer = await this.producerModel
      .findByIdAndUpdate(id, { name, studioId, movies }, { new: true })
      .exec();

    if (!producer) {
      throw new NotFoundException(`Producer with ID ${id} not found`);
    }

    return producer;
  }

  async remove(id: string) {
    const producer = await this.producerModel.findByIdAndDelete(id).exec();

    if (!producer) {
      throw new NotFoundException(`Producer with ID ${id} not found`);
    }
    return `Producer with id:${id} deleted successfully`;
  }
}
