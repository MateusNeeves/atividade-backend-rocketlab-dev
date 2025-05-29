import { IsNotEmpty, IsNumber, Min, IsObject } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateCartDto {
  @IsObject()
  @Transform(({ value }) => {
    // Converte as strings para números tanto nas chaves quanto nos valores
    const result = {};
    Object.entries(value).forEach(([key, val]) => {
      const numKey = parseInt(key);
      const numVal = parseInt(val as string);
      
      if (!isNaN(numKey) && !isNaN(numVal)) {
        result[numKey] = numVal;
      }
    });
    return result;
  })
  products: Record<number, number>;
}