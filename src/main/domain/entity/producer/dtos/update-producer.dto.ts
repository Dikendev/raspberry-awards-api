import { Types } from 'mongoose';
import { z } from 'zod';

export const UpdateProducerSchema = z.object({
  name: z.string().optional(),
  studioId: z.instanceof(Types.ObjectId).optional(),
  movies: z.array(z.instanceof(Types.ObjectId)).optional(),
});

export type UpdateProducerDto = z.infer<typeof UpdateProducerSchema>;

export const ObjectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId');
