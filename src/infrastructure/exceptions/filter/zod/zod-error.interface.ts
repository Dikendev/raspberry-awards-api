export interface MinimalError {
  param: PathError;
  message: string;
}

export type PathError = string | number;
