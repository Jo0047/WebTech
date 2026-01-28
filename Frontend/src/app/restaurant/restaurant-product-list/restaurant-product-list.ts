import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

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
    RouterLink,
    FormsModule
  ],
})
export class RestaurantProductList implements OnInit {
  private http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/data/drink';

  products: Drink[] = [];
  selectedCategory: string = '';

  categories = [
    'Soft drink',
    'Cocktail',
    'Beer',
    'Wine',
    'Coffee',
    'Tea',
  ];

  ngOnInit() {
    this.loadDrinks();
  }

  loadDrinks() {
    const restaurantId = 1;

    this.http.get<Drink[]>(this.apiUrl, {
      params: { restaurant_id: restaurantId }
    }).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => console.error('Error fetching drinks:', err)
    });
  }

  get filteredProducts() {
    if (!this.selectedCategory) return this.products;
    return this.products.filter(
      (drink) => drink.category === this.selectedCategory
    );
  }
}
