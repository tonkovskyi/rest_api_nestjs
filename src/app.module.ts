import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app.config.module';
import { AppTypeormModule } from './config/typeorm.config.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { ProductModule } from './products/product.module';
import { OrderModule } from './orders/order.module';
import { PictureModule } from './products/pictures/picture.module';
import { CsvModule } from './csv/csv.module';

@Module({
  imports: [
    AppConfigModule,
    AppTypeormModule,
    AuthModule,
    RolesModule,
    UsersModule,
    ProductModule,
    OrderModule,
    PictureModule,
    CsvModule,
  ],
})
export class AppModule {}
