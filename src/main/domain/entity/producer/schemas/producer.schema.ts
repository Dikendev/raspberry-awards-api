import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MovieDocument } from '../../movie/schemas/movie.schema';

export type ProducerDocument = Producer & Document<Types.ObjectId>;

@Schema({ collection: 'producers' })
export class Producer {
  @Prop({ type: Types.ObjectId, auto: true })
  id: Types.ObjectId;

  @Prop({ required: true, type: String, unique: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Studio' })
  studioId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Movie' })
  movies: Types.Array<MovieDocument>;
}

export const ProducerSchema = SchemaFactory.createForClass(Producer);
