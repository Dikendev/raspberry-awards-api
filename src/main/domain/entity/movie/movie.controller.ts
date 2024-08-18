import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto, CreateMovieSchema } from './dtos/create-movie.dto';
import { ZodPipe } from '../../../../infrastructure/pipe/zod.pipe';
import { objectIdSchema } from '../../../../utils/validate-mongo-id';
import { MovieDocument } from './schemas/movie.schema';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiSwagger } from '../../../../decorators/swagger.decorator';
import { ApiSwaggerPagination } from '../../../../decorators/pagination.decorator';

@ApiTags('Movies')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiSwagger(
    'Movies',
    'Create a new movie',
    'Create a new movie with the provided data. Returns the created movie.',
  )
  @Post()
  async create(
    @Res() response: Response,
    @Body(new ZodPipe(CreateMovieSchema))
    createMovieDto: CreateMovieDto,
  ) {
    const newMovie = await this.movieService.create(createMovieDto);
    return response.status(HttpStatus.CREATED).json(newMovie);
  }

  @ApiSwagger(
    'Movies',
    'Find all movies',
    'Find all movies. Returns a list of movies, with pagination.',
  )
  @ApiSwaggerPagination()
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<MovieDocument[]> {
    return this.movieService.findAll(page, limit);
  }

  @ApiSwagger(
    'Movies',
    'Find a movie by id',
    'Find a movie by id. Returns the movie.',
  )
  @Get(':id')
  async findById(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
  ): Promise<MovieDocument> {
    return this.movieService.findById(id);
  }

  @ApiSwagger(
    'Movies',
    'Update a movie by id',
    'Update a movie by id with the provided data. Returns the updated movie.',
  )
  @Patch(':id')
  async update(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
    @Body() updateMovieDto: Partial<CreateMovieDto>,
  ): Promise<MovieDocument> {
    return this.movieService.updateMovie(id, updateMovieDto);
  }

  @ApiSwagger(
    'Movies',
    'Delete a movie by id',
    'Delete a movie by id. Returns the id of the deleted movie.',
  )
  @Delete(':id')
  async deleteById(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
  ): Promise<string> {
    return this.movieService.deleteById(id);
  }
}
