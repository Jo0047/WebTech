import {Component, inject} from '@angular/core';
import {RestaurantService} from '../../general/services/restaurant.service';
import {Restaurant} from '@models/restaurant';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer-customer-basket',
  imports: [],
  templateUrl: './customer-restaurant-basket.html',
  styleUrl: './customer-restaurant-basket.css',
})
export class CustomerRestaurantBasket {
  restaurant: Restaurant | null = null;

  constructor(private router: Router) {
    if (window.history.state.restaurantData) {
      this.restaurant = window.history.state.restaurantData;
    } else {
      // No data available, navigate back to restaurant list
      this.router.navigate(['/customer']);
    }
  }

  goBack() {
    this.router.navigate(['/customer']);
  }

  getStarArray(rating: string): boolean[] {
    const ratingNum = parseInt(rating);
    return Array(5).fill(false).map((_, index) => index < Math.round(ratingNum));
  }

  protected readonly parseInt = parseInt;

}
