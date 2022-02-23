import { IsNotEmpty } from 'class-validator';

export class OrderListDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  size: string;

  @IsNotEmpty()
  quantity: number;
}
