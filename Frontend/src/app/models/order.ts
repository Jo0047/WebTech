import {OrderStatus} from './OrderStatus';

export interface Order {
  order_id: number;
  order_status: OrderStatus;
  drinks: DrinkItem[];
  address: Address;
}
