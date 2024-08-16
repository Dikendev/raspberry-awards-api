import { Types } from 'mongoose';
import { z } from 'zod';

export const CreateStudioSchema = z.object({
  name: z
    .string()
    .min(1, 'Name of studio at least 1 character')
    .max(255, 'Name of studio at most 255 characters'),
  movies: z.array(z.instanceof(Types.ObjectId)).optional(),
  producerId: z.instanceof(Types.ObjectId).optional(),
});

export type CreateStudioDto = z.infer<typeof CreateStudioSchema>;
