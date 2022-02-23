import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Picture } from './pictures/picture.entity';
import { Product } from './entity/product.entity';
import { ProductOptions } from './entity/product.options.entity';
import { PictureDto } from './dto/pictures.dto';
import { ProductPropertyDto } from './dto/property.products.dto';
import { PictureService } from './pictures/picture.service';
import { ProductService } from './product.service';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller()
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly pictureService: PictureService,
  ) {}

  @Get('products')
  async findAllProducts() {
    return await this.productService.findAllProducts();
  }
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('products/picture')
  async findAllPictures(): Promise<Picture[]> {
    return await this.pictureService.findAll();
  }
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('products/picture')
  async addPicture(@Body() pictureDto: PictureDto): Promise<PictureDto> {
    return await this.pictureService.addPicture(pictureDto);
  }
  @Get('products/:id')
  async findOneProduct(@Param('id') id: number) {
    return await this.productService.findOneProduct(id);
  }
  @Get('search')
  async search(@Query('q') q: string) {
    return await this.productService.searchIn(q);
  }
  @Get('wishlist')
  async favorite(@Req() req: Request): Promise<Product[]> {
    return await this.productService.favorite(req);
  }
  @Put('wishlist/:id')
  async addToWishList(@Req() req: Request, @Param('id') id: number) {
    return await this.productService.addFavorite(req, id);
  }
  @Delete('wishlist/:id')
  async deleteFavorite(@Req() req: Request, @Param('id') id: number) {
    return await this.productService.deleteFavorite(req, id);
  }
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('option')
  async addProperty(
    @Body() property: ProductPropertyDto,
  ): Promise<ProductOptions> {
    return await this.productService.addProperty(property);
  }
}
