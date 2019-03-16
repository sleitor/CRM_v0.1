import { Position } from '../shared/interfaces';

export class OrderPageService {
  list = [];
  price = 0;

  add(position: Position) {

    const orderPosition = Object.assign({}, {
      name: position.name,
      quantity: position.quantity,
      cost: position.cost,
    });

    this.list.push(orderPosition);

  }

  remove() {

  }

  clear() {

  }
}
