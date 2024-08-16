import { Types, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Winner {
  yes = 'yes',
  no = 'no',
}

export type MovieDocument = Movie & Document<Types.ObjectId>;

@Schema({ collection: 'movies' })
export class Movie {
  @Prop({ required: true, type: String, unique: true })
  title: string;

  @Prop({ required: true, type: Number })
  year: number;

  @Prop({ type: Types.ObjectId, ref: 'Studio', required: true })
  studioId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Producer', required: true })
  producerId: Types.ObjectId;

  @Prop({ type: String, required: true, enum: Winner })
  winner: Winner;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
