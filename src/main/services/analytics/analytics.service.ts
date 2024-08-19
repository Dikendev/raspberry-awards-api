import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProducersService } from '../../domain/entity/producer/producers.service';
import { Movie } from '../../domain/entity/movie/schemas/movie.schema';

@Injectable()
export class AnalyticsService {
  constructor(private readonly producerService: ProducersService) {}

  async getProducerWithLargestGap(): Promise<any> {
    const producers = await this.producerService.findAll();
    let largestGapProducer = null;
    let largestGap = 0;

    producers.forEach((producer) => {
      const winningMovies = producer.movies
        .filter((movie) => movie.winner === 'yes')
        .sort((a: Movie, b: Movie) => a.year - b.year);

      if (winningMovies.length > 1) {
        for (let i = 1; i < winningMovies.length; i++) {
          const gap = winningMovies[i].year - winningMovies[i - 1].year;
          if (gap > largestGap) {
            largestGap = gap;
            largestGapProducer = producer;
          }
        }
      }
    });

    this.throwErrorIfNotSufficientData(
      largestGapProducer,
      largestGap,
      'Not enough data to calculate largest gap',
    );

    return {
      producer: largestGapProducer,
      largestGap,
    };
  }

  async getProducerWithFastestWins(): Promise<any> {
    const producers = await this.producerService.findAll();
    let fastestProducer = null;
    let fastestGap = Infinity;

    producers.forEach((producer) => {
      const winningMovies = producer.movies
        .filter((movie) => movie.winner === 'yes')
        .sort((a: Movie, b: Movie) => a.year - b.year);

      if (winningMovies.length > 1) {
        for (let i = 1; i < winningMovies.length; i++) {
          const gap = winningMovies[i].year - winningMovies[i - 1].year;
          if (gap < fastestGap) {
            fastestGap = gap;
            fastestProducer = producer;
          }
        }
      }
    });

    this.throwErrorIfNotSufficientData(
      fastestProducer,
      fastestGap,
      'Not enough data to calculate fastest wins gap',
    );

    return {
      producer: fastestProducer,
      fastestGap,
    };
  }

  throwErrorIfNotSufficientData(
    fastestProducer: string,
    fastestGap: number,
    message: string,
  ): void {
    if (!fastestProducer || fastestGap === Infinity) {
      throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
  async getProducerMovieCounts(): Promise<
    { name: string; movieCount: number }[]
  > {
    return this.producerService.getProducerMovieCounts();
  }
}
