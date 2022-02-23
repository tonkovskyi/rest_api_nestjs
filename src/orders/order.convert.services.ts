import { Order } from './order.entity';
import { OrderListDto } from 'src/orders/dto/order.info.dto';

class Services {
  transformOrder(info: OrderListDto, req): OrderListDto {
    req.body.products.map((x) => {
      (info.productId = x.productId),
        (info.color = x.options.map((y) => y.color).toString()),
        (info.size = x.options
          .map((y) => y.size)
          .toString()
          .toLowerCase()),
        (info.quantity = +x.options.map((y) => y.quantity));
    });
    return info;
  }

  newOrder(newOrder: Order, Pid: number, Uid: number, Oid, Quan: number) {
    newOrder.productsId = Pid;
    newOrder.usersId = Uid;
    newOrder.optionsId = Oid;
    newOrder.amount = Quan;
    return newOrder;
  }
}
export default new Services();
