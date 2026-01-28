import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RouterLink} from '@angular/router';

interface Drink {
  drink_name: string;
  category: string;
  ingredients: string;
  alcoholic: boolean;
  price: number;
}

@Component({
  selector: 'app-restaurant-product-list',
  templateUrl: './restaurant-product-list.html',
  styleUrl: './restaurant-product-list.css',
  imports: [
    RouterLink
  ],
})
export class RestaurantProductList implements OnInit {
  private http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/data/drink';

  products: Drink[] = [];

  ngOnInit() {
    this.loadDrinks();
  }

  loadDrinks() {
    const restaurantId = 1; //TODO Get ID

    this.http.get<Drink[]>(this.apiUrl, {
      params: { restaurant_id: restaurantId }
    }).subscribe({
      next: (data) => {
        this.products = data;
        console.log('Drinks loaded:', this.products);
      },
      error: (err) => {
        console.error('Error fetching drinks:', err);
      }
    });
  }
}
