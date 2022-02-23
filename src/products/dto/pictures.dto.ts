import { IsNotEmpty } from 'class-validator';

export class PictureDto {
  @IsNotEmpty()
  readonly url: string;

  @IsNotEmpty()
  readonly productsId: number;
}