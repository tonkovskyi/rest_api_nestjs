import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from './picture.entity';
import { Product } from '../entity/product.entity';
import { ProductModule } from '../product.module';
import { PictureService } from './picture.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Picture, Product]),
    forwardRef(() => ProductModule),
  ],
  providers: [PictureService],
  exports: [PictureService],
})
export class PictureModule {}
