import { z } from 'zod';

export const CreateProducerSchema = z.object({
  name: z.string().min(1),
});

export type CreateProducerDto = z.infer<typeof CreateProducerSchema>;
