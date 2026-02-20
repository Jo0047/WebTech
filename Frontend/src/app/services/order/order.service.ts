import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BasketItem} from '../../models/BasketItem';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/orders';

  /**
   * Get orders by restaurant ID
   */
  getOrdersByRestaurant(restaurantId: number): Observable<any> {
    const params = new HttpParams().set('restaurant_id', restaurantId.toString());
    return this.http.get(`${this.apiUrl}/order`, { params });
  }

  placeOrder(userEmail: string, items: BasketItem[]): Observable<any> {
    const payload = {
      user_email: userEmail,
      items: items.map(item => ({
        drink_id: item.drink.id,
        quantity: item.quantity
      }))
    };
    return this.http.post(`${this.apiUrl}/placeOrder`, payload);
  }




}
