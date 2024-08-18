import { Expose } from 'class-transformer';

export class ProducerResponse {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
