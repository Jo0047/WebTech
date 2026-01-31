import {Component, inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RestaurantService} from '../../services/restaurant/restaurant.service';

enum OrderStatus {
  pending = 'pending',
  rejected = 'rejected',
  preparing = 'preparing',
  ready = 'ready',
  dispatched = 'dispatched',
  arrived = 'arrived'
}


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


  async ngOnInit() {
    await this.loadOrders();
  }

  async loadOrders() {
    let restaurantId = await this.restaurantService.getRestaurantId()

    this.http.get<Order[]>(this.apiUrl + '/order', {
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

  async rejectOrder(order: Order) {
    console.log(order, "rejecting...");
    this.http.post(this.apiUrl + '/reject', order).subscribe({
      next: () => {
        this.loadOrders();
        console.log(order, "rejection successful" );

      }
    })
  }
//TODO reload page, and restrict changes
  advanceOrder(order: Order) {
    console.log(order, "advancing...");
    this.http.post(this.apiUrl + '/advance', order).subscribe({
      next: () => {
        this.loadOrders();
      console.log(order, "advance successful");}
    })

  }

}
