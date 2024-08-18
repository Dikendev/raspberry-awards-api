import { z } from 'zod';

export const CreateStudioSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, 'Name of studio at least 1 character')
    .max(255, 'Name of studio at most 255 characters'),
});

export type CreateStudioDto = z.infer<typeof CreateStudioSchema>;
