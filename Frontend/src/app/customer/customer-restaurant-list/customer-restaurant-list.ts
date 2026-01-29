import {Component, inject} from '@angular/core';
import {Restaurant} from '@models/restaurant';
import {Router} from '@angular/router';
import {RestaurantService} from '../../general/services/restaurant/restaurant.service';

@Component({
  selector: 'app-customer-restaurant-list',
  imports: [],
  templateUrl: './customer-restaurant-list.html',
  styleUrl: './customer-restaurant-list.css',
})
export class CustomerRestaurantList {

  restaurantService = inject(RestaurantService);

  restaurants: Restaurant[] = [];

  constructor(
    private router: Router
  ) {
    this.restaurantService.getRestaurantsWithCuisineAndRating().subscribe(data => {
      this.restaurants = (data as any).restaurants;
      console.log(this.restaurants);
    });
  }

}
