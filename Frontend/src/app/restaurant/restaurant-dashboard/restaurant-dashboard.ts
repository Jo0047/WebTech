import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { Order } from '../../models/order';

interface DrinkStats {
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.html',
  styleUrls: ['./restaurant-dashboard.css'],
})
export class RestaurantDashboard implements OnInit {
  restaurantService: RestaurantService = inject(RestaurantService);
  private http = inject(HttpClient);

  orders: Order[] = [];
  ordersPerDay: Map<string, number> = new Map();
  mostOrderedDrink: DrinkStats | null = null;

  apiUrl = 'http://localhost:3000/orders';

  ngOnInit() {
    this.loadOrders();
  }

  async loadOrders() {
    const restaurantId = await this.restaurantService.getRestaurantId();
    this.http.get<Order[]>(this.apiUrl + '/order', {
      params: { restaurant_id: restaurantId }
    }).subscribe({
      next: data => {
        this.orders = data;
        console.log(data);
        this.calculateOrdersPerDay();
        this.calculateMostOrderedDrink();
      },
      error: err => console.error(err)
    });
  }

  calculateOrdersPerDay() {
    this.ordersPerDay.clear();
    this.orders.forEach(order => {
      const date = new Date(order.created_at).toLocaleDateString();
      this.ordersPerDay.set(date, (this.ordersPerDay.get(date) || 0) + 1);
    });
  }

  calculateMostOrderedDrink() {
    const drinkCount: Record<string, number> = {};

    this.orders.forEach(order => {
      order.drinks.forEach(drink => {
        drinkCount[drink.drink_name] = (drinkCount[drink.drink_name] || 0) + drink.quantity;
      });
    });

    let maxQuantity = 0;
    let favorite: string | null = null;

    for (const [name, qty] of Object.entries(drinkCount)) {
      if (qty > maxQuantity) {
        maxQuantity = qty;
        favorite = name;
      }
    }

    this.mostOrderedDrink = favorite ? { name: favorite, quantity: maxQuantity } : null;
  }
}
