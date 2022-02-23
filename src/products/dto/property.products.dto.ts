import { IsNotEmpty } from 'class-validator';

export class ProductPropertyDto {
  @IsNotEmpty()
  readonly count: number;

  @IsNotEmpty()
  readonly productsId: number;

  @IsNotEmpty()
  readonly colorsId: number;

  @IsNotEmpty()
  readonly sizesId: number;
}