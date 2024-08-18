import { ZodPipe } from '../zod.pipe';
import { ZodSchema, z } from 'zod';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';

describe('ZodPipe', () => {
  let pipe: ZodPipe;
  let schema: ZodSchema<any>;

  beforeEach(() => {
    schema = z.object({
      name: z.string(),
      age: z.number().int().positive(),
    });
    pipe = new ZodPipe(schema);
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should validate and transform valid input', () => {
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: Object,
      data: '',
    };
    const value = { name: 'John Doe', age: 30 };

    expect(pipe.transform(value, metadata)).toEqual(value);
  });

  it('should throw BadRequestException for invalid input', () => {
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: Object,
      data: '',
    };
    const value = { name: 'John Doe', age: -5 };

    expect(() => pipe.transform(value, metadata)).toThrow(BadRequestException);
  });

  it('should throw BadRequestException for missing required fields', () => {
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: Object,
      data: '',
    };
    const value = { name: 'John Doe' };

    expect(() => pipe.transform(value, metadata)).toThrow(BadRequestException);
  });

  it('should throw BadRequestException for extra fields', () => {
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: Object,
      data: '',
    };
    const value = { name: 'John Doe', age: 30, extra: 'field' };

    expect(() => pipe.transform(value, metadata)).toThrow(BadRequestException);
  });
});
