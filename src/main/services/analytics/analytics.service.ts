import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProducersService } from '../../domain/entity/producer/producers.service';
import { Movie } from '../../domain/entity/movie/schemas/movie.schema';
import { ProducerDocument } from '../../domain/entity/producer/schemas/producer.schema';
import {
  AnalyticsFastestWins,
  AnalyticsLargestGap,
  AnalyticsMovieCounts,
} from './interfaces/analytics.interface';
import { MovieService } from '../../domain/entity/movie/movie.service';
import { StudioService } from '../../domain/entity/studio/studio.service';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly producerService: ProducersService,
    private readonly movieService: MovieService,
    private readonly studioService: StudioService,
  ) {}

  async producerWithLargestGap(): Promise<AnalyticsLargestGap> {
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

  async producerWithFastestWins(): Promise<AnalyticsFastestWins> {
    const producers = await this.producerService.findAll();
    let fastestProducer: ProducerDocument = null;
    let fastestWins = Infinity;

    producers.forEach((producer) => {
      const winningMovies = producer.movies
        .filter((movie) => movie.winner === 'yes')
        .sort((a: Movie, b: Movie) => a.year - b.year);

      if (winningMovies.length > 1) {
        for (let i = 1; i < winningMovies.length; i++) {
          const gap = winningMovies[i].year - winningMovies[i - 1].year;
          if (gap < fastestWins) {
            fastestWins = gap;
            fastestProducer = producer;
          }
        }
      }
    });

    this.throwErrorIfNotSufficientData(
      fastestProducer,
      fastestWins,
      'Not enough data to calculate fastest wins gap',
    );

    return {
      producer: fastestProducer,
      fastestWins,
    };
  }

  async producerMovieCounts(): Promise<AnalyticsMovieCounts> {
    return this.producerService.getProducerMovieCounts();
  }

  async moviesCountByYear(): Promise<any> {
    return this.movieService.moviesCountByYear();
  }

  async studioCount(): Promise<number> {
    return this.movieService.count();
  }

  async moviesCountByStudio(): Promise<any> {
    return this.studioService.moviesCountByStudio();
  }

  throwErrorIfNotSufficientData(
    fastestProducer: ProducerDocument,
    fastestGap: number,
    message: string,
  ): void {
    if (!fastestProducer || fastestGap === Infinity) {
      throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
