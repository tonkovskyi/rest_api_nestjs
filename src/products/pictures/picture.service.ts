import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Picture } from './picture.entity';
import { Product } from '../entity/product.entity';
import { getConnection, Repository } from 'typeorm';
import { PictureDto } from '../dto/pictures.dto';

@Injectable()
export class PictureService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>,
  ) {}

  async addPicture(images: PictureDto): Promise<PictureDto> {
    let imageAndProduct = {
      url: images.url,
      productsId: images.productsId,
    };
    let product = await this.productRepository.findOne({
      where: {
        id: images.productsId,
      },
    });
    try {
      if (product) {
        const createImage = await getConnection()
          .createQueryBuilder()
          .insert()
          .into('pictures')
          .values([
            {
              url: imageAndProduct.url,
              product: imageAndProduct.productsId,
            },
          ])
          .returning('*')
          .execute();

        return createImage.raw;
      }
    } catch (err) {
      console.log(err);
    }
  }
  async findAll(): Promise<Picture[]> {
    return this.pictureRepository.find();
  }
}
