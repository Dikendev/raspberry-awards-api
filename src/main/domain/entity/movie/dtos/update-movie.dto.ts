import { z } from 'zod';

export const UpdateMovieSchema = z.object({
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
  studio: z.string().min(1, 'Studio must be at least 1 character long'),
  producer: z.string().min(1, 'Producer must be at least 1 character long'),
  winner: z.enum(['yes', 'no']),
});

export type UpdateMovieDto = z.infer<typeof UpdateMovieSchema>;
