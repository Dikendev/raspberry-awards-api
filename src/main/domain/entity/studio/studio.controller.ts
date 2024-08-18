import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StudioService } from './studio.service';
import { ZodPipe } from '../../../../infrastructure/pipe/zod.pipe';
import { CreateStudioDto, CreateStudioSchema } from './dtos/create-studio.dto';
import { objectIdSchema } from '../../../../utils/validate-mongo-id';
import { UpdateStudioDto, UpdateStudioSchema } from './dtos/update-studio.dto';
import { Studio } from './schemas/studio.schema';

@Controller('studio')
export class StudioController {
  constructor(private readonly studioService: StudioService) {}

  @Post()
  async create(
    @Body(new ZodPipe(CreateStudioSchema)) createStudioDto: CreateStudioDto,
  ) {
    return this.studioService.create(createStudioDto);
  }

  @Get()
  async findAll() {
    return this.studioService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
  ): Promise<Studio> {
    return this.studioService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
    @Body(new ZodPipe(UpdateStudioSchema)) updateStudioDto: UpdateStudioDto,
  ) {
    return this.studioService.update(id, updateStudioDto);
  }

  @Delete(':id')
  delete(@Param('id', new ZodPipe(objectIdSchema)) id: string) {
    return this.studioService.delete(id);
  }
}
