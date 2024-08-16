import { z } from 'zod';
import { Types } from 'mongoose';
import { Winner } from '../schemas/movie.schema';

export const CreateMovieSchema = z.object({
  title: z
    .string()
    .min(1, 'Title of movie at least 1 character')
    .describe('Title of the movie'),
  year: z
    .number()
    .int()
    .min(1500, 'Year must be greater than 1500')
    .max(2500, 'Year must be less than 2500'),
  studioId: z.instanceof(Types.ObjectId),
  producerId: z.instanceof(Types.ObjectId),
  winner: z.nativeEnum(Winner, {
    errorMap: () => ({ message: 'Winner must be yes or no' }),
  }),
});

export type CreateMovieDto = z.infer<typeof CreateMovieSchema>;
