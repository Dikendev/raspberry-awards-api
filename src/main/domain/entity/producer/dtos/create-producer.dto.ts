// import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

// export class CreateProducerDto {
//   @IsString()
//   @IsNotEmpty({ message: 'Name of producer is required' })
//   @MaxLength(255, { message: 'Name of studio can have at most 255 characters' })
//   name: string;
// }

import { z } from 'zod';

export const CreateProducerSchema = z.object({
  name: z.string().min(1),
});

export type CreateProducerDto = z.infer<typeof CreateProducerSchema>;
