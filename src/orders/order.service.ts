import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "../orders/order.entity";
import { DeleteResult, Repository } from "typeorm";
import { Request } from "express";
import { Product } from "../products/entity/product.entity";
import { OrderListDto } from "./dto/order.info.dto";
import { ProductOptions } from "../products/entity/product.options.entity";
import { JwtService } from "@nestjs/jwt";
import services from "../orders/order.convert.services";
@Injectable()


export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly ordersRepo: Repository<Order>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(ProductOptions)
        private readonly propertyRepostory: Repository<ProductOptions>,
        private readonly jwtService: JwtService,
    ) { }


    async findAllOrders(): Promise<Order[]> {
        return await this.ordersRepo.find()
    }

    async compareProductOrder(req: Request): Promise<Order | DeleteResult> {
        const token = req.headers.authorization
        const user = this.jwtService.verify(token.replace("Bearer ", ""))
        let newOrder = new Order()
        let infoOrderDto = new OrderListDto()
        infoOrderDto = services.transformOrder(infoOrderDto, req)
        const product = await this.productRepository.findOne({ where: { id: infoOrderDto.productId } })
        const optionOfProduct = product.options.find(x => x.colors.color == infoOrderDto.color && x.sizes.size == infoOrderDto.size)
        if ((optionOfProduct.count - infoOrderDto.quantity) > 0) {
            await this.propertyRepostory.update({ id: optionOfProduct.id }, {
                count: optionOfProduct.count - infoOrderDto.quantity
            })
            newOrder = services.newOrder(newOrder, product.id, user.id, optionOfProduct.id, infoOrderDto.quantity)
            return await this.ordersRepo.save(newOrder)
        } else if ((optionOfProduct.count - infoOrderDto.quantity) === 0) {
            newOrder = services.newOrder(newOrder, product.id, user.id, optionOfProduct.id, infoOrderDto.quantity)
            await this.ordersRepo.save(newOrder)
            return await this.propertyRepostory.delete({ id: optionOfProduct.id })
        } else {
            console.log('error');
        }
    }
}