import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto, CreateMovieSchema } from './dtos/create-movie.dto';
import { ProducersService } from '../producer/producers.service';
import { StudioService } from '../studio/studio.service';
import { NotFoundException } from '../../../../infrastructure/exceptions/filter/app/not-found.exception';
import { UpdateMovieDto, UpdateMovieSchema } from './dtos/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    private readonly producerService: ProducersService,
    @Inject(forwardRef(() => StudioService))
    private readonly studioService: StudioService,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<MovieDocument> {
    const { studioId, producerId } =
      await this.handleOptionalParams(createMovieDto);

    const findProducer = await this.producerService.findById(producerId);

    if (!findProducer) throw new NotFoundException('Producer not found');

    const findStudio = await this.studioService.findById(studioId);

    if (!findStudio) throw new NotFoundException('Studio not found');

    const existingMovie = await this.findByTitle(createMovieDto.title);

    if (existingMovie) {
      await existingMovie
        .updateOne({
          $addToSet: {
            producer: producerId,
            studio: studioId,
          },
        })
        .exec();

      await findProducer.updateOne({
        $addToSet: { movies: existingMovie._id },
      });

      await findStudio.updateOne({
        $addToSet: { movies: existingMovie._id },
      });

      return existingMovie;
    }

    const newMovie = new this.movieModel({
      ...createMovieDto,
      producer: producerId,
      studio: studioId,
    });

    const savedMovie = await newMovie.save();

    await findProducer.updateOne({
      $addToSet: { movies: savedMovie._id },
    });

    await findStudio.updateOne({
      $addToSet: { movies: savedMovie._id },
    });

    return savedMovie;
  }

  async findById(id: string): Promise<MovieDocument> {
    const movie = await this.movieModel
      .findById(id)
      .populate('producer')
      .exec();

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return movie;
  }

  async findByTitle(title: string): Promise<MovieDocument> {
    return this.movieModel.findOne({ title: title }).exec();
  }

  async findAll(page: number, limit: number): Promise<MovieDocument[]> {
    page = Math.max(1, page);
    limit = Math.max(1, limit);

    const skip = (page - 1) * limit;

    const data = await this.movieModel
      .find()
      .populate('studio')
      .populate('producer')
      .skip(skip)
      .limit(limit)
      .exec();

    return data;
  }

  async updateMovie(
    id: string,
    createMovieDto: CreateMovieDto,
  ): Promise<MovieDocument> {
    const { studioId, producerId, ...rest } =
      CreateMovieSchema.parse(createMovieDto);

    const studioExist = await this.studioService.exists(studioId);

    if (!studioExist) {
      throw new NotFoundException('Studio not found');
    }

    const producerExist = await this.producerService.exists(producerId);

    if (!producerExist) {
      throw new NotFoundException('Producer not found');
    }

    const updatedMovie = await this.movieModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            title: rest.title,
            year: rest.year,
            studio: studioId,
            producer: producerId,
            winner: rest.winner,
          },
        },
        { new: true },
      )
      .exec();

    if (!updatedMovie) {
      throw new NotFoundException('Movie not found');
    }

    return updatedMovie;
  }

  async partialUpdateMovie(
    id: string,
    updateMovieDto: Partial<UpdateMovieDto>,
  ): Promise<MovieDocument> {
    const { studio, producer, ...rest } =
      UpdateMovieSchema.partial().parse(updateMovieDto);

    const updateData: any = { ...rest };

    if (studio) {
      const studioExist = await this.studioService.create({ name: studio });
      updateData.studio = studioExist.id;
    }

    if (producer) {
      const producerExist = await this.producerService.create({
        name: producer,
      });
      updateData.producer = producerExist.id;
    }

    const updatedMovie = await this.movieModel
      .findByIdAndUpdate(id, { $set: updateData }, { new: true })
      .exec();

    if (!updatedMovie) {
      throw new NotFoundException('Movie not found');
    }

    return updatedMovie;
  }

  async exists(id: string) {
    return this.movieModel.exists({ _id: id });
  }

  async deleteById(id: string) {
    const movie = await this.findById(id);
    await movie.deleteOne();
    return `Movie with id:${id} deleted successfully`;
  }

  async deleteProducerRelation(producerId: string) {
    await this.movieModel
      .updateMany({ producer: producerId }, { $pull: { producer: producerId } })
      .exec();

    return `Producer with id:${producerId} and associated movies deleted successfully`;
  }

  async count() {
    return this.movieModel.countDocuments().exec();
  }

  private async handleOptionalParams(createMovieDto: CreateMovieDto) {
    let studioId = createMovieDto.studioId;
    let producerId = createMovieDto.producerId;

    if (!studioId && createMovieDto.studio) {
      const newStudio = await this.studioService.create({
        name: createMovieDto.studio,
      });
      studioId = newStudio.id;
    }

    if (!producerId && createMovieDto.producer) {
      const newProducer = await this.producerService.create({
        name: createMovieDto.producer,
      });
      producerId = newProducer.id;
    }

    return { studioId, producerId };
  }
}
