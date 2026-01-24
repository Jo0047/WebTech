import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-restaurant-product-list',
  templateUrl: './restaurant-product-list.html',
  styleUrl: './restaurant-product-list.css',
})
export class RestaurantProductList {
  private http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/data';
  //TODO get from backend

  products: any[] = [];

  loadDrinks() {
    const restaurant_id = 1
    const restaurantId = 1; // example
    this.http
      .get<any[]>(`/drinks?restaurant_id=${restaurantId}`)
      .subscribe({
        next: (data) => {
          this.products = data; // assign API response
        },
        error: (err) => console.error('Error fetching drinks', err)
      });
  }

}
