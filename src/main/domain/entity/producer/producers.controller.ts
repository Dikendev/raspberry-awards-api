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

@Controller('producers')
export class ProducersController {
  constructor(private readonly producersService: ProducersService) {}

  @Post()
  async create(
    @Body(new ZodPipe(CreateProducerSchema))
    createProducerDto: CreateProducerDto,
  ) {
    return this.producersService.create(createProducerDto);
  }

  @Get()
  list() {
    return this.producersService.findAll();
  }

  @Get(':id')
  async findById(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
  ): Promise<ProducerDocument> {
    return this.producersService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
    @Body(new ZodPipe(UpdateProducerSchema))
    updateProducerDto: UpdateProducerDto,
  ): Promise<ProducerDocument> {
    return this.producersService.update(id, updateProducerDto);
  }

  @Delete(':id')
  delete(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
  ): Promise<string> {
    return this.producersService.delete(id);
  }
}
