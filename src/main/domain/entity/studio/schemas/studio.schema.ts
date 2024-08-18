import mongoose, { Document, Types } from 'mongoose';
import { Movie } from '../../movie/schemas/movie.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type StudioDocument = Studio & Document<Types.ObjectId>;

@Schema()
export class Studio {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] })
  movies: Movie[];
}

export const StudioSchema = SchemaFactory.createForClass(Studio);
