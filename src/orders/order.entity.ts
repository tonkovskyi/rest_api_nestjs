import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../products/entity/product.entity';
import { ProductOptions } from '../products/entity/product.options.entity';
import { User } from '../users/users.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  productsId: number;

  @PrimaryColumn()
  usersId: number;

  @PrimaryColumn()
  optionsId: number;

  @Column()
  amount: number;

  @ManyToOne(() => Product, (product) => product.orders, {
    onDelete: 'CASCADE',
  })
  products: Product[];

  @ManyToOne(() => User, (user) => user.orders)
  users: User[];

  @ManyToOne(() => ProductOptions, (option) => option.orders)
  options: ProductOptions[];
}
