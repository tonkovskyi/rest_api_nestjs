import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/order.entity';
import { Product } from '../products/entity/product.entity';
import { ProductOptions } from '../products/entity/product.options.entity';
import { ProductModule } from '../products/product.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get('JWT_SECRET'),
        };
      },
    }),
    TypeOrmModule.forFeature([Order, Product, ProductOptions]),
    ProductModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [],
})
export class OrderModule {}
