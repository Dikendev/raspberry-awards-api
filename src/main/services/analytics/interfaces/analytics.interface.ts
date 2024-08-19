import { ProducerDocument } from '../../../domain/entity/producer/schemas/producer.schema';

export interface AnalyticsProducer {
  producer: ProducerDocument;
}

export interface AnalyticsLargestGap extends AnalyticsProducer {
  largestGap: number;
}

export interface AnalyticsFastestWins extends AnalyticsProducer {
  fastestWins: number;
}

export interface AnalyticsMovieCount {
  name: string;
  movieCount: number;
}

export type AnalyticsMovieCounts = AnalyticsMovieCount[];
