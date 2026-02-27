import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Restaurant } from '../../models/restaurant';
import { BasketItem } from '../../models/BasketItem';
import { OrderService } from '../../services/order/order.service';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Component({
  selector: 'app-customer-checkout',
  imports: [FormsModule],
  templateUrl: './customer-checkout.html',
  styleUrl: './customer-checkout.css',
})
export class CustomerCheckout {
  basket: BasketItem[] = [];
  restaurant: Restaurant | null = null;

  voucherApplied: boolean = false;
  voucherDiscount: number = 0;
  voucherError: string = '';

  orderService: OrderService = inject(OrderService);
  authService: AuthenticationService = inject(AuthenticationService);

  constructor(private router: Router) {
    this.basket = window.history.state['basket'];
    this.restaurant = window.history.state['restaurant'];

    if (!this.basket || !this.restaurant) {
      this.router.navigate(['/customer/restaurants']);
    }
  }

  applyVoucher(code: string): void {
    this.voucherError = '';
    const normalized = code.trim().toUpperCase();
    if (!normalized || !this.restaurant) return;

    this.orderService.checkVoucher(this.restaurant.id, normalized).subscribe({
      next: (res) => {
        if (res.discount != null){
          this.voucherDiscount = res.discount;
          this.voucherApplied = true;
        }else{
          this.voucherError = 'Invalid or expired voucher code.';
        }

      },
      error: () => {
        this.voucherError = 'Invalid or expired voucher code.';
        this.voucherApplied = false;
      }
    });
  }

  getSubtotal(): number {
    return this.basket.reduce((total, item) => total + +item.drink.price * item.quantity, 0);
  }

  getTotal(): number {
    return Math.max(0, this.getSubtotal() - (this.getSubtotal()*(this.voucherDiscount/100)));
  }

  formatPrice(price: number): string {
    return `€${price.toFixed(2).replace('.', ',')}`;
  }

  goBack(): void {
    if (this.restaurant) {
      this.router.navigate([`/customer/${this.restaurant.restaurant_name}`], {
        state: { restaurantData: this.restaurant },
      });
    } else {
      this.router.navigate(['/customer/restaurants']);
    }
  }

  placeOrder(): void {
    if (this.basket.length === 0) return;

    this.orderService.placeOrder(this.authService.getEmail(), this.basket).subscribe({
      next: () => {
        alert('Order placed successfully!');
        this.router.navigate(['/customer/restaurants']);
      },
      error: (err) => {
        console.error('Order failed:', err);
        alert('Something went wrong. Please try again.');
      },
    });
  }
}
