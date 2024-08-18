import { Injectable } from '@nestjs/common';
import { MovieService } from '../../../domain/entity/movie/movie.service';
import { ProducersService } from '../../../domain/entity/producer/producers.service';
import { StudioService } from '../../../domain/entity/studio/studio.service';
import { ResultCsvFileStructures } from '../../../services/file-parser/interfaces/csv.interface';

@Injectable()
export class PopulateDatabaseService {
  constructor(
    private readonly movieService: MovieService,
    private readonly producer: ProducersService,
    private readonly studioService: StudioService,
  ) {}

  async populateDataBase(
    resultGetFromFile: ResultCsvFileStructures,
  ): Promise<void> {
    for (let i = 0; i < resultGetFromFile.length; i++) {
      const producers = this.convertToArray(resultGetFromFile[i].producers);

      for (let j = 0; j < producers.length; j++) {
        const producer = await this.producer.create({
          name: producers[j],
        });

        const studio = await this.studioService.create({
          name: resultGetFromFile[i].studios,
        });

        await this.movieService.create({
          year: resultGetFromFile[i].year,
          title: resultGetFromFile[i].title,
          studioId: studio.id,
          producerId: producer.id,
          winner: resultGetFromFile[i].winner,
        });
      }
    }
  }

  convertToArray(input: string): string[] {
    return input
      .split(/,\s*|and\s+/)
      .map((item) => item.trim())
      .filter((item) => item !== '');
  }
}
