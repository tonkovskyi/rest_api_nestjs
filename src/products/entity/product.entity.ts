import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from '../../orders/order.entity';
import { Picture } from '../pictures/picture.entity';
import { ProductOptions } from './product.options.entity';

import { User } from '../../users/users.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column({ type: 'decimal' })
  @IsNotEmpty()
  price: number;

  @ManyToMany(() => User, (product) => product.products, {
    onDelete: 'CASCADE',
  })
  users: User[];

  @OneToMany(() => Picture, (picture) => picture.product, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  images: Picture[];

  @OneToMany(() => ProductOptions, (option) => option.products, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'product_options',
  })
  options: ProductOptions[];

  @OneToMany(() => Order, (order) => order.products, { onDelete: 'CASCADE' })
  orders: Order;
}