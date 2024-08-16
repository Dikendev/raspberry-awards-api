import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProducersService } from './producers.service';
import { CreateProducerDto, ProducerDtoType } from './dtos/create-producer.dto';
import { ZodPipe } from '../../../../infrastructure/pipe/zod.pipe';
import {
  ObjectIdSchema,
  UpdateProducerDto,
  UpdateProducerSchema,
} from './dtos/update-producer.dto';

@Controller('producers')
export class ProducersController {
  constructor(private readonly producersService: ProducersService) {}

  @Post()
  async create(
    @Body(new ZodPipe(CreateProducerDto)) createProducerDto: ProducerDtoType,
  ) {
    return this.producersService.create(createProducerDto);
  }

  @Get()
  list() {
    return this.producersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ZodPipe(ObjectIdSchema)) id: string) {
    return this.producersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ZodPipe(ObjectIdSchema)) id: string,
    @Body(new ZodPipe(UpdateProducerSchema))
    updateProducerDto: UpdateProducerDto,
  ) {
    return this.producersService.update(id, updateProducerDto);
  }

  @Delete(':id')
  remove(@Param('id', new ZodPipe(ObjectIdSchema)) id: string) {
    return this.producersService.remove(id);
  }
}
