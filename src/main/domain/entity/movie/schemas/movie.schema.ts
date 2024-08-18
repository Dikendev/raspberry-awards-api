import mongoose, { Types, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Producer } from '../../producer/schemas/producer.schema';
import { Studio } from '../../studio/schemas/studio.schema';
import { Winner } from '../../../../services/file-parser/interfaces/csv.interface';

export type MovieDocument = Movie & Document<Types.ObjectId>;

@Schema({ timestamps: true, collection: 'movies' })
export class Movie {
  _id: Types.ObjectId;

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
