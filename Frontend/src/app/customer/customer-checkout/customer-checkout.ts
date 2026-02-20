import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {Restaurant} from '../../models/restaurant';
import {BasketItem} from '../../models/BasketItem';
import {OrderService} from '../../services/order/order.service';
import {AuthenticationService} from '../../services/auth/authentication.service';

@Component({
  selector: 'app-customer-checkout',
  imports: [],
  templateUrl: './customer-checkout.html',
  styleUrl: './customer-checkout.css',
})
export class CustomerCheckout {
  basket: BasketItem[] = [];
  restaurant: Restaurant | null = null;
  orderService: OrderService = inject(OrderService);
  authService: AuthenticationService = inject(AuthenticationService);

  constructor(private router: Router) {
    this.basket = window.history.state['basket'];
    this.restaurant = window.history.state['restaurant'];

    if (!this.basket || !this.restaurant) {
      this.router.navigate(['/customer/restaurants']);
    }

  }

  // Calculation methods
  getSubtotal(): number {
    return this.basket.reduce((total, item) => {
      const price = typeof item.drink.price === 'string'
        ? parseFloat(item.drink.price)
        : item.drink.price;
      return total + (price * item.quantity);
    }, 0);
  }


  getTotal(): number {
    return this.getSubtotal();
  }

  formatPrice(price: number): string {
    return `€${price.toFixed(2).replace('.', ',')}`;
  }

  // Navigation methods
  goBack(): void {
    if (this.restaurant) {
      this.router.navigate([`/customer/${this.restaurant.restaurant_name}`], {
        state: { restaurantData: this.restaurant }
      });
    } else {
      this.router.navigate(['/customer/restaurants']);
    }
  }

  // Order submission
  placeOrder(): void {
    if (this.basket.length === 0) {
      return;
    }

    this.orderService.placeOrder(this.authService.getEmail(), this.basket).subscribe({
      next: () => {
        alert('Order placed successfully!');
        this.router.navigate(['/customer/restaurants']);
      },
      error: (err) => {
        console.error('Order failed:', err);
        alert('Something went wrong. Please try again.');
      }
    });
  }

}
