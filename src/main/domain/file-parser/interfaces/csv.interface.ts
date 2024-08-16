export type Winner = 'yes' | 'no';

export interface ResultCsvFileStructure {
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: Winner;
}

export type ResultCsvFileStructures = ResultCsvFileStructure[];
