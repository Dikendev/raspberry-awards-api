import { Injectable } from '@nestjs/common';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dtos/create-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<void> {
    console.log('createMovieDto', createMovieDto);
    const createdMovie = new this.movieModel(createMovieDto);
    await createdMovie.save();
  }
}
