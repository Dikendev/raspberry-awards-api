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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Studios')
@Controller('studio')
export class StudioController {
  constructor(private readonly studioService: StudioService) {}

  @ApiTags('Studios')
  @ApiOperation({
    summary: 'Create a new studio',
    description:
      'Create a new studio with the provided data. Returns the created studio.',
  })
  @Post()
  async create(
    @Body(new ZodPipe(CreateStudioSchema)) createStudioDto: CreateStudioDto,
  ) {
    return this.studioService.create(createStudioDto);
  }

  @ApiTags('Studios')
  @ApiOperation({
    summary: 'Find all studios',
    description: 'Find all studios. Returns an array of studios.',
  })
  @Get()
  async findAll() {
    return this.studioService.findAll();
  }

  @ApiTags('Studios')
  @ApiOperation({
    summary: 'Find a studio by id',
    description: 'Find a studio by id. Returns the studio.',
  })
  @Get(':id')
  async findOne(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
  ): Promise<Studio> {
    return this.studioService.findById(id);
  }

  @ApiTags('Studios')
  @ApiOperation({
    summary: 'Update a studio',
    description:
      'Update a studio with the provided data. Returns the updated studio.',
  })
  @Patch(':id')
  update(
    @Param('id', new ZodPipe(objectIdSchema)) id: string,
    @Body(new ZodPipe(UpdateStudioSchema)) updateStudioDto: UpdateStudioDto,
  ) {
    return this.studioService.update(id, updateStudioDto);
  }

  @ApiTags('Studios')
  @ApiOperation({
    summary: 'Delete a studio',
    description: 'Delete a studio by id. Returns the deleted studio.',
  })
  @Delete(':id')
  delete(@Param('id', new ZodPipe(objectIdSchema)) id: string) {
    return this.studioService.delete(id);
  }
}
