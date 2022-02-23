import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { createQueryBuilder, getConnection, Like, Repository } from 'typeorm';
import { Product } from '../products/entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductOptions } from '../products/entity/product.options.entity';
import { ProductPropertyDto } from './dto/property.products.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';

@Injectable()
export class ProductService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductOptions)
    private readonly propertyRepostory: Repository<ProductOptions>,
  ) {}

  async showParse(sorted: Product[]): Promise<Object[]> {
    return sorted.map((x) => {
      return {
        id: x.id,
        name: x.name,
        description: x.description,
        price: x.price,
        images: x.images,
        options: [
          {
            displayName: 'Color',
            values: x.options.map((y) => y.colors.color),
          },
          {
            displayName: 'Size',
            values: x.options.map((y) => y.sizes.size),
          },
        ],
      };
    });
  }

  async findAllProducts(): Promise<Object[]> {
    const allProduct = await this.productRepository.find();
    const sorted = allProduct.filter((x) => x.options.length != 0);
    return await this.showParse(sorted);
  }

  async findOneProduct(id: number): Promise<Object> {
    const products = await this.productRepository.findOne({ where: { id } });
    return {
      id: products.id,
      name: products.name,
      description: products.description,
      price: products.price,
      images: products.images,
      options: [
        {
          displayName: 'Color',
          values: products.options.map((y) => y.colors.color),
        },
        {
          displayName: 'Size',
          values: products.options.map((y) => y.sizes.size),
        },
      ],
    };
  }

  async searchIn(name: string): Promise<Object[]> {
    const findAll = await this.productRepository.find({
      name: Like(`%${name}%`),
    });
    return await this.showParse(findAll);
  }

  async addProperty(propertyProd: ProductPropertyDto): Promise<ProductOptions> {
    const newProperty = new ProductOptions();
    Object.assign(newProperty, propertyProd);
    await this.propertyRepostory.save(newProperty);
    return newProperty;
  }

  async favorite(req: Request): Promise<Product[]> {
    const token = req.headers.authorization;
    const user = this.jwtService.verify(token.replace('Bearer ', ''));
    const query = await createQueryBuilder(User, 'users')
      .where('users.id = :userId', { userId: user.id })
      .innerJoinAndSelect('users.products', 'products')
      .innerJoinAndSelect('products.images', 'images');
    const userCur: User = await query.getOne();
    if (userCur) return userCur.products;
    return [];
  }

  async addFavorite(req: Request, idProduct: number): Promise<void> {
    const token = req.headers.authorization;
    const user = this.jwtService.verify(token.replace('Bearer ', ''));
    const newFavorite = await getConnection()
      .createQueryBuilder()
      .relation(User, 'products')
      .of(user.id)
      .add(idProduct);
    return newFavorite;
  }

  async deleteFavorite(req: Request, idProduct: number): Promise<void> {
    const token = req.headers.authorization;
    const user = this.jwtService.verify(token.replace('Bearer ', ''));
    const deleted = await getConnection()
      .createQueryBuilder()
      .relation(User, 'products')
      .of(user.id)
      .remove(idProduct);
    return deleted;
  }
}