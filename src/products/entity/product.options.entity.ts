import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Color } from './color.entity';
import { Order } from '../../orders/order.entity';
import { Product } from './product.entity';
import { Size } from './size.entity';

@Entity({ name: 'options' })
export class ProductOptions {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  productsId: number;

  @PrimaryColumn()
  colorsId: number;

  @PrimaryColumn()
  sizesId: number;

  @Column()
  count: number;

  @ManyToOne(() => Size, (size) => size.option, {
    eager: true,
    onDelete: 'CASCADE',
  })
  sizes: Size;

  @ManyToOne(() => Color, (color) => color.option, {
    eager: true,
    onDelete: 'CASCADE',
  })
  colors: Color;

  @ManyToOne(() => Product, (product) => product.options, {
    eager: false,
    onDelete: 'CASCADE',
  })
  products: Product;

  @OneToMany(() => Order, (order) => order.options, {
    onDelete: 'CASCADE',
    eager: false,
  })
  orders: Order;
}