import { z } from 'zod';

export const UpdateProducerSchema = z
  .object({
    name: z.string().min(1, 'Name must be at least 1 character long'),
  })
  .strict();

export type UpdateProducerDto = z.infer<typeof UpdateProducerSchema>;
