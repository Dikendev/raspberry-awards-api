import { z } from 'zod';
import { Types } from 'mongoose';

export const CreateProducerDto = z.object({
  name: z.string().min(1),
  studioId: z.instanceof(Types.ObjectId).optional(),
  movies: z.array(z.instanceof(Types.ObjectId)).optional(),
});

export type ProducerDtoType = z.infer<typeof CreateProducerDto>;
