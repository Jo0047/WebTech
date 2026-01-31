import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {RestaurantService} from '../../services/restaurant/restaurant.service';
import {DrinkService} from '../../services/drink/drink.service';
import {Drink} from '../../models/drink';

@Component({
  selector: 'app-order-product-list',
  templateUrl: './restaurant-product-list.html',
  styleUrl: './restaurant-product-list.css',
  imports: [
    RouterLink,
    FormsModule
  ],
})
export class RestaurantProductList implements OnInit {
  restaurantService: RestaurantService = inject(RestaurantService);
  drinkService: DrinkService = inject(DrinkService);

  private http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/drinks';

  drinks: Drink[] = [];
  selectedCategory: string = '';

  categories = [
    'Soft drink',
    'Cocktail',
    'Beer',
    'Wine',
    'Coffee',
    'Tea',
  ];

  async ngOnInit() {
    await this.loadDrinks();
  }

  async loadDrinks() {
    let restaurantId = await this.restaurantService.getRestaurantId()

    this.drinkService.getDrinksByRestaurant(restaurantId).subscribe(data => {
      this.drinks = (data as any).drinks;
      console.log(this.drinks);
    });



  }

  get filteredProducts() {
    if (!this.selectedCategory) return this.drinks;
    return this.drinks.filter(
      (drink) => drink.category === this.selectedCategory
    );
  }
}
