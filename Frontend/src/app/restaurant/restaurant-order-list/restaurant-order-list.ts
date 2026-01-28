import {Component, inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RestaurantService} from '../../general/services/restaurant.service';

enum OrderStatus {
  pending,
  rejected,
  preparing,
  ready,
  dispatched,
  arrived
}

interface DrinkItem {
  drink_name: string;
  quantity: number;
  unit_price: number; // e.g., 4.50
}

interface Order {
  order_id: number;
  order_status: OrderStatus;
  drinks: DrinkItem[];
}

@Component({
  selector: 'app-restaurant-order-list',
  imports: [],
  templateUrl: './restaurant-order-list.html',
  styleUrl: './restaurant-order-list.css',
})
export class RestaurantOrderList implements OnInit{
  restaurantService: RestaurantService = inject(RestaurantService);


  private http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/data/order';

  orders: Order[] = [];


  async ngOnInit() {
    await this.loadOrders();
  }

  async loadOrders() {
    let restaurantId = await this.restaurantService.getRestaurantId()

    this.http.get<Order[]>(this.apiUrl, {
      params: { restaurant_id: restaurantId }
    }).subscribe({
      next: (data) => {
        this.orders = data;
        console.log('orders loaded:', this.orders);
      },
      error: (err) => {
        console.error('Error fetching drinks:', err);
      }
    });
  }

  rejectOrder(order: Order) {
    console.log(order, "rejected");
  }

  advanceOrder(order: Order) {
    console.log(order, "advanced");
  }

}
