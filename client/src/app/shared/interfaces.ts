export interface User {
  email: string;
  password: string;
}

export interface Response {
  message: string
}

export interface Category {
  name: string;
  imageSrc?: string;
  user?: string;
  _id?: string;

}

export interface Position {
  name: string;
  cost: number;
  category: string;
  user?: string;
  _id?: string;
  quantity?: number;
}

export interface Order {
  list: OrderPositon[]
  date?: Date;
  order?: number;
  user?: string;
  _id?: string;
}

export interface OrderPositon {
  name: string;
  quantity: number;
  cost: number;
  _id?: string;
}
