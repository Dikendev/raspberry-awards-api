import mongoose, { Types, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Producer } from '../../producer/schemas/producer.schema';
import { Studio } from '../../studio/schemas/studio.schema';

export type Winner = 'yes' | 'no';

export type MovieDocument = Movie & Document<Types.ObjectId>;

@Schema({ collection: 'movies' })
export class Movie {
  @Prop({ required: true, type: String, unique: true })
  title: string;

  @Prop({ required: true, type: Number })
  year: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Studio' }] })
  studio: Studio;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producer' }] })
  producer: Producer;

  @Prop({ type: String, required: true })
  winner: Winner;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
