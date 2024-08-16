import { Document, Types } from 'mongoose';
import { MovieDocument } from '../../movie/schemas/movie.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type StudioDocument = Studio & Document<Types.ObjectId>;

@Schema({ collection: 'studios' })
export class Studio {
  @Prop({ type: Types.ObjectId, auto: true })
  id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Movie' }] })
  movies: MovieDocument[];

  @Prop({ type: Types.ObjectId, ref: 'Producer' })
  producerId: Types.ObjectId;
}

export const StudioSchema = SchemaFactory.createForClass(Studio);
