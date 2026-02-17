import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {RestaurantService} from '../../services/restaurant/restaurant.service';
import {DrinkService} from '../../services/drink/drink.service';
import {Drink} from '../../models/drink';
import {Category} from '../../models/category';

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


  ngOnInit() {
      this.restaurantService.getRestaurantId()
        .then(id => this.drinkService.getDrinksByRestaurant(id))
        .then(obs => obs.subscribe(data => {
          this.drinks = (data as any).drinks;
        }));
  }

  get filteredProducts() {
    if (!this.selectedCategory) return this.drinks;
    return this.drinks.filter(
      (drink) => drink.category === this.selectedCategory
    );
  }

  deleteDrink(id: number) {
    if (!confirm('Are you sure you want to delete this drink?')) return;

    this.drinkService.deleteDrink(id).subscribe(() => {
      this.drinks = this.drinks.filter(d => d.id !== id);
    });
  }

}
