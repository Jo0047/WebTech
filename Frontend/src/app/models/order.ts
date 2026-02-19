import {OrderStatus} from './OrderStatus';

interface Order {
  order_id: number;
  order_status: OrderStatus;
  drinks: DrinkItem[];
  address: Address;
}
