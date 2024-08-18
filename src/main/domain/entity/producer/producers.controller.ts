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
import { ApiTags } from '@nestjs/swagger';
import { ApiSwagger } from '../../../../decorators/swagger.decorator';

@ApiTags('Producers')
@Controller('producers')
export class ProducersController {
  constructor(private readonly producersService: ProducersService) {}

  @ApiSwagger(
    'Producers',
    'Create a new producer',
    'Create a new producer with the provided data. Returns the created producer.',
  )
  @Post()
  async create(
    @Body(new ZodPipe(CreateProducerSchema))
    createProducerDto: CreateProducerDto,
  ): Promise<ProducerDocument> {
    return this.producersService.create(createProducerDto);
  }

  @ApiSwagger(
    'Producers',
    'Find all producers',
    'List all producers with pagination. Returns an array of producers.',
  )
  @Get()
  list(): Promise<ProducerDocument[]> {
    return this.producersService.findAll();
  }

  @ApiSwagger(
    'Producers',
    'Find a producer by id',
    'Find a producer by id. Returns the producer.',
  )
  @Get(':id')
  async findById(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
  ): Promise<ProducerDocument> {
    return this.producersService.findById(id);
  }

  @ApiSwagger(
    'Producers',
    'Update a producer by id',
    'Update a producer by id with the provided data. Returns the updated producer.',
  )
  @ApiTags('Producers')
  @Patch(':id')
  update(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
    @Body(new ZodPipe(UpdateProducerSchema))
    updateProducerDto: UpdateProducerDto,
  ): Promise<ProducerDocument> {
    return this.producersService.update(id, updateProducerDto);
  }

  @ApiSwagger(
    'Producers',
    'Delete a producer by id',
    'Delete a producer by id. Returns a message with the deleted producer id.',
  )
  @Delete(':id')
  delete(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
  ): Promise<string> {
    return this.producersService.delete(id);
  }
}
