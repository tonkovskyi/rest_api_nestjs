import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductOptions } from './product.options.entity';

@Entity({ name: 'sizes' })
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  size: string;

  @OneToMany(() => ProductOptions, (options) => options.sizes)
  option: ProductOptions[];
}
