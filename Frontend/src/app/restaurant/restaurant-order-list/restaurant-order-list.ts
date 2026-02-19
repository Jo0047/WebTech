import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RestaurantService} from '../../services/restaurant/restaurant.service';
import {OrderStatus} from '../../models/OrderStatus';
import { MatSnackBar } from '@angular/material/snack-bar';



interface DrinkItem {
  drink_name: string;
  quantity: number;
  unit_price: number;
}

interface Order {
  order_id: number;
  order_status: OrderStatus;
  drinks: DrinkItem[];
  address: Address;
}

interface Address {
  street: string;
  street_number: string;
  zip_code: string;
  city: string;
}


@Component({
  selector: 'app-order-order-list',
  imports: [],
  templateUrl: './restaurant-order-list.html',
  styleUrl: './restaurant-order-list.css',
})
export class RestaurantOrderList implements OnInit{
  restaurantService: RestaurantService = inject(RestaurantService);
  private snackBar = inject(MatSnackBar);


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
        this.orders = data.sort((a, b) => b.order_id - a.order_id);
        console.log('orders loaded:', this.orders);
      },
      error: err => console.error(err)
    });
  }

  async rejectOrder(order: Order) {
    this.http.post(this.apiUrl + '/reject', order).subscribe({
      next: () => {
        this.loadOrders()
      }
    })
  }

  advanceOrder(order: Order) {
      this.http.post(this.apiUrl + '/advance', order).subscribe({
        next: () => {
          this.loadOrders()
        }
      })
  }

  protected readonly OrderStatus = OrderStatus;
}
