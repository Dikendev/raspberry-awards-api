export interface MinimalError {
  path: PathError;
  message: string;
}

export type PathError = string | number;
