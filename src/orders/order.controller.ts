import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from "express";
import { DeleteResult } from 'typeorm';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get('order')
  async findAllOrders(): Promise<Order[]> {
    return await this.orderService.findAllOrders();
  }

  @Post('order')
  async addOrder(@Req() req :Request): Promise<Order | DeleteResult> {
    return await this.orderService.compareProductOrder(req)
  }
}
