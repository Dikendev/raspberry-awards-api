import { z } from 'zod';

export const CreateMovieSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Title of movie at least 1 character')
      .describe('Title of the movie'),
    year: z
      .number()
      .int()
      .min(1500, 'Year must be greater than 1500')
      .max(2500, 'Year must be less than 2500')
      .positive(),
    studioId: z
      .string()
      .min(1, 'Studio ID must be at least 1 character long')
      .optional(),
    producerId: z
      .string()
      .min(1, 'Studio ID must be at least 1 character long')
      .optional(),
    winner: z.enum(['yes', 'no']),
    studio: z.string().optional(),
    producer: z.string().optional(),
  })
  .strict();

export type CreateMovieDto = z.infer<typeof CreateMovieSchema>;
