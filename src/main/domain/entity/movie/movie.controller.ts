import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto, CreateMovieSchema } from './dtos/create-movie.dto';
import { ZodPipe } from '../../../../infrastructure/pipe/zod.pipe';
import { objectIdSchema } from '../../../../utils/validate-mongo-id';
import { MovieDocument } from './schemas/movie.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiTags('Movies')
  @ApiOperation({
    summary: 'Create a new movie',
    description:
      'Create a new movie with the provided data. Returns the created movie.',
  })
  @Post()
  async create(
    @Body(new ZodPipe(CreateMovieSchema)) createMovieDto: CreateMovieDto,
  ): Promise<MovieDocument> {
    return this.movieService.create(createMovieDto);
  }

  @ApiTags('Movies')
  @ApiOperation({
    summary: 'List all movies',
    description: 'List all movies with pagination. Returns an array of movies.',
  })
  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<MovieDocument[]> {
    return this.movieService.findAll(page, limit);
  }

  @ApiTags('Movies')
  @ApiOperation({
    summary: 'Find a movie by id',
    description: 'Find a movie by id. Returns the movie.',
  })
  @Get(':id')
  async findById(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
  ): Promise<MovieDocument> {
    return this.movieService.findById(id);
  }

  @ApiTags('Movies')
  @ApiOperation({
    summary: 'Update a movie by id',
    description:
      'Update a movie by id with the provided data. Returns the updated movie.',
  })
  @Patch(':id')
  async update(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
    @Body() updateMovieDto: Partial<CreateMovieDto>,
  ): Promise<MovieDocument> {
    return this.movieService.updateMovie(id, updateMovieDto);
  }

  @ApiTags('Movies')
  @ApiOperation({
    summary: 'Delete a movie by id',
    description: 'Delete a movie by id. Returns the id of the deleted movie.',
  })
  @Delete(':id')
  async deleteById(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
  ): Promise<string> {
    return this.movieService.deleteById(id);
  }
}
