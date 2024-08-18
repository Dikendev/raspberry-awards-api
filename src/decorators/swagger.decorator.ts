import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

export function ApiSwagger(
  apiTags: string,
  summary: string,
  description: string,
) {
  return applyDecorators(
    ApiTags(apiTags),
    ApiOperation({
      summary,
      description,
    }),
  );
}
