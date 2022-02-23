import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Role } from '../roles/roles.entity';
import { Product } from '../products/entity/product.entity';
import { Order } from '../orders/order.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToMany(() => Role, (roles) => roles.user, { eager: true })
  @JoinTable({ name: 'users_roles' })
  roles: Role[];

  @ManyToMany(() => Product, (user) => user.users, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'favorite',
  })
  products: Product[];

  @OneToMany(() => Order, (order) => order.users)
  orders: Order;
}
