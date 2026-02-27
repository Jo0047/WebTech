import {Component, inject} from '@angular/core';
import {Restaurant} from '../../models/restaurant';
import {Router} from '@angular/router';
import {Drink} from '../../models/drink';
import {DrinkService} from '../../services/drink/drink.service';


interface BasketItem {
  drink: Drink;
  quantity: number;
}

@Component({
  selector: 'app-order-order-basket',
  imports: [],
  templateUrl: './customer-restaurant-basket.html',
  styleUrl: './customer-restaurant-basket.css',
})
export class CustomerRestaurantBasket {

  drinkService = inject(DrinkService);
  restaurant: Restaurant | null = null;
  drinks: Drink[] = []
  basket: BasketItem[] = [];

  constructor(private router: Router) {
    if (window.history.state.restaurantData) {
      this.restaurant = window.history.state.restaurantData;
    } else {
      this.router.navigate(['/customer']);
    }

    this.drinkService.getDrinksByRestaurant(this.restaurant?.id).subscribe(data => {
      this.drinks = (data as any).drinks;
      console.log(this.drinks);
    });
  }

  goBack() {
    this.router.navigate(['/customer']);
  }

  getStarArray(rating: string): boolean[] {
    const ratingNum = parseInt(rating);
    return Array(5).fill(false).map((_, index) => index < Math.round(ratingNum));
  }

  addToBasket(drink: Drink): void {
    const existingItem = this.basket.find(item => item.drink.id === drink.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.basket.push({
        drink: drink,
        quantity: 1
      });
    }

    console.log('Basket updated:', this.basket);
  }

  increaseQuantity(drinkId: number): void {
    const item = this.basket.find(item => item.drink.id === drinkId);
    if (item) {
      item.quantity++;
    }
  }

  decreaseQuantity(drinkId: number): void {
    const item = this.basket.find(item => item.drink.id === drinkId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        // Remove item if quantity would be 0
        this.basket = this.basket.filter(basketItem => basketItem.drink.id !== drinkId);
      }
    }
  }

  getTotalItems(): number {
    return this.basket.reduce((total, item) => total + item.quantity, 0);
  }

  getTotal(): number {
    return this.basket.reduce((total, item) => total + +item.drink.price * item.quantity, 0);
  }

  formatPrice(price: number | string): string {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `€${numPrice.toFixed(2)}`;
  }

  proceedToCheckout(): void {
    if (this.basket.length > 0) {
      console.log('Proceeding to checkout with:', this.basket);

      this.router.navigate(['/customer/checkout'], {
        state: {
          basket: this.basket,
          restaurant: this.restaurant
        }
      });
    }
  }

  protected readonly parseInt = parseInt;
}
