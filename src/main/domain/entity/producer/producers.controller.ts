import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ProducersService } from './producers.service';
import { ZodPipe } from '../../../../infrastructure/pipe/zod.pipe';
import { objectIdSchema } from '../../../../utils/validate-mongo-id';
import {
  CreateProducerDto,
  CreateProducerSchema,
} from './dtos/create-producer.dto';
import {
  UpdateProducerDto,
  UpdateProducerSchema,
} from './dtos/update-producer.dto';
import { ProducerDocument } from './schemas/producer.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Producers')
@Controller('producers')
export class ProducersController {
  constructor(private readonly producersService: ProducersService) {}

  @ApiTags('Producers')
  @ApiOperation({
    summary: 'Create a new producer',
    description:
      'Create a new producer with the provided data. Returns the created producer.',
  })
  @Post()
  async create(
    @Body(new ZodPipe(CreateProducerSchema))
    createProducerDto: CreateProducerDto,
  ): Promise<ProducerDocument> {
    return this.producersService.create(createProducerDto);
  }

  @ApiTags('Producers')
  @ApiOperation({
    summary: 'List all producers',
    description:
      'List all producers with pagination. Returns an array of producers.',
  })
  @Get()
  list(): Promise<ProducerDocument[]> {
    return this.producersService.findAll();
  }

  @ApiTags('Producers')
  @ApiOperation({
    summary: 'Find a producer by id',
    description: 'Find a producer by id. Returns the producer.',
  })
  @Get(':id')
  async findById(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
  ): Promise<ProducerDocument> {
    return this.producersService.findById(id);
  }

  @ApiTags('Producers')
  @ApiOperation({
    summary: 'Update a producer by id',
    description:
      'Update a producer by id with the provided data. Returns the updated producer.',
  })
  @Patch(':id')
  update(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
    @Body(new ZodPipe(UpdateProducerSchema))
    updateProducerDto: UpdateProducerDto,
  ): Promise<ProducerDocument> {
    return this.producersService.update(id, updateProducerDto);
  }

  @ApiTags('Producers')
  @ApiOperation({
    summary: 'Delete a producer by id',
    description:
      'Delete a producer by id. Returns a message with the deleted producer id.',
  })
  @Delete(':id')
  delete(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
  ): Promise<string> {
    return this.producersService.delete(id);
  }
}
