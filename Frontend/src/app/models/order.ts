import {OrderStatus} from './OrderStatus';

export interface Order {
  order_id: number;
  order_status: OrderStatus;
  created_at: string;
  drinks: DrinkItem[];
  address: Address;
}
