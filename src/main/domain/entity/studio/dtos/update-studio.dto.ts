import { z } from 'zod';

export const UpdateStudioSchema = z
  .object({
    name: z.string().min(1, 'Studio name must have min 1 character').optional(),
    producerId: z.string().optional(),
    moviesId: z.string().array().optional(),
  })
  .strict();

export type UpdateStudioDto = z.infer<typeof UpdateStudioSchema>;
