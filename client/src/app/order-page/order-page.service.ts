import { OrderPositon, Position } from '../shared/interfaces';

export class OrderPageService {
  list = [];
  price = 0;

  add(position: Position) {

    const orderPosition: OrderPositon = Object.assign({}, {
      name: position.name,
      quantity: position.quantity,
      cost: position.cost,
      _id: position._id,
    });

    const candidate = this.list.find(p => p._id === orderPosition._id);
    if (candidate) {
      candidate.quantity += orderPosition.quantity;
    } else {
      this.list.push(orderPosition);
    }

    this.computePrice();

  }

  remove(position: OrderPositon) {
    this.list = this.list.filter(p => p._id !== position._id);
    this.computePrice();

  }

  clear() {
    this.list = [];
    this.price = 0;

  }

  computePrice() {
    this.price = this.list.reduce((total, item) => total + item.quantity * item.cost, 0);
  }
}
