import { Body, Controller, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { ZodPipe } from '../../../../infrastructure/pipe/zod.pipe';
import { CreateMovieDto, CreateMovieSchema } from './dtos/create-movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async create(
    @Body(new ZodPipe(CreateMovieSchema)) createMovieDto: CreateMovieDto,
  ) {
    return this.movieService.create(createMovieDto);
  }
}
