import {Component, inject} from '@angular/core';
import {Restaurant} from '../../models/restaurant';
import {Router} from '@angular/router';
import {RestaurantService} from '../../services/restaurant/restaurant.service';

@Component({
  selector: 'app-order-order-list',
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

  getStarArray(restaurant: Restaurant): boolean[] {
    const rating = parseInt(restaurant.average_rating);
    return Array(5).fill(false).map((_, index) => index < Math.round(rating));
  }

  navigateToRestaurant(restaurant: Restaurant) {
    this.router.navigate(['/customer',restaurant.restaurant_name], {
      state: {
        restaurantData: restaurant
      }
    });
  }

  protected readonly parseInt = parseInt;
}
