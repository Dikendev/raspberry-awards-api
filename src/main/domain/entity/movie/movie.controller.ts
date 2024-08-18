import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto, CreateMovieSchema } from './dtos/create-movie.dto';
import { ZodPipe } from '../../../../infrastructure/pipe/zod.pipe';
import { objectIdSchema } from '../../../../utils/validate-mongo-id';
import { MovieDocument } from './schemas/movie.schema';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async create(
    @Body(new ZodPipe(CreateMovieSchema)) createMovieDto: CreateMovieDto,
  ): Promise<MovieDocument> {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<MovieDocument[]> {
    return this.movieService.findAll(page, limit);
  }

  @Get(':id')
  async findById(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
  ): Promise<MovieDocument> {
    return this.movieService.findById(id);
  }

  @Put(':id')
  async updateMovie(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
    @Body() createMovieDto: CreateMovieDto,
  ): Promise<MovieDocument> {
    return this.movieService.updateMovie(id, createMovieDto);
  }

  @Patch(':id')
  async partialUpdateMovie(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
    @Body() updateMovieDto: Partial<CreateMovieDto>,
  ): Promise<MovieDocument> {
    return this.movieService.partialUpdateMovie(id, updateMovieDto);
  }

  @Delete(':id')
  async deleteById(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
  ): Promise<string> {
    return this.movieService.deleteById(id);
  }
}
