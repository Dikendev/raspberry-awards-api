import { Expose, Type } from 'class-transformer';
import { ProducerResponse } from '../../producer/schemas/producer-response';

export class StudioResponse {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  movies: any[];

  @Expose()
  @Type(() => ProducerResponse)
  producer: ProducerResponse[];
}
