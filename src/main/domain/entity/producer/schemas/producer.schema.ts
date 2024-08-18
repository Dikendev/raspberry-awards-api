import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { MovieDocument } from '../../movie/schemas/movie.schema';

export type ProducerDocument = Producer & Document<Types.ObjectId>;

@Schema()
export class Producer {
  @Prop({ unique: true, index: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] })
  movies: MovieDocument[];
}

export const ProducerSchema = SchemaFactory.createForClass(Producer);
