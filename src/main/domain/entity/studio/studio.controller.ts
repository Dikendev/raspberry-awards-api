import { Body, Controller, Post } from '@nestjs/common';
import { StudioService } from './studio.service';
import { ZodPipe } from '../../../../infrastructure/pipe/zod.pipe';
import { CreateStudioDto, CreateStudioSchema } from './dtos/create-studio.dto';

@Controller('studio')
export class StudioController {
  constructor(private readonly studioService: StudioService) {}

  @Post()
  async create(
    @Body(new ZodPipe(CreateStudioSchema)) createStudioDto: CreateStudioDto,
  ) {
    return this.studioService.create(createStudioDto);
  }
}
