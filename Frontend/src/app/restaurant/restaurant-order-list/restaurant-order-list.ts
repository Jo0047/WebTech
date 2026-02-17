import {Component, inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RestaurantService} from '../../services/restaurant/restaurant.service';
import {OrderStatus} from '../../models/OrderStatus';
import {Restaurant} from '../../models/restaurant';


interface DrinkItem {
  drink_name: string;
  quantity: number;
  unit_price: number;
}

interface Order {
  order_id: number;
  order_status: OrderStatus;
  drinks: DrinkItem[];
}

@Component({
  selector: 'app-order-order-list',
  imports: [],
  templateUrl: './restaurant-order-list.html',
  styleUrl: './restaurant-order-list.css',
})
export class RestaurantOrderList implements OnInit{
  restaurantService: RestaurantService = inject(RestaurantService);

  private http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/orders';

  orders: Order[] = [];

  ngOnInit() {
    this.loadOrders()
  }

  loadOrders() {
    this.restaurantService.getRestaurantId().then(id => {
      this.fetchOrders(id);
    });
  }

  fetchOrders(id: number) {
    this.http.get<Order[]>(this.apiUrl + '/order', {
      params: { restaurant_id: id }
    }).subscribe({
      next: data => {
        this.orders = data;
        console.log('orders loaded:', this.orders);
      },
      error: err => console.error(err)
    });
  }

  async rejectOrder(order: Order) {
    console.log(order, "rejecting...");
    this.http.post(this.apiUrl + '/reject', order).subscribe({
      next: () => {
        this.loadOrders()
      }
    })
  }
//TODO restrict changes
  advanceOrder(order: Order) {
    console.log(order, "advancing...");
    this.http.post(this.apiUrl + '/advance', order).subscribe({
      next: () => {
        this.loadOrders()
      }
    })
  }
}
