import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductOptions } from './product.options.entity';

@Entity({ name: 'colors' })
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  color: string;

  @OneToMany(() => ProductOptions, (options) => options.colors)
  option: ProductOptions[];
}
