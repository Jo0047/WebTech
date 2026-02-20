import {inject, Injectable} from '@angular/core';
import {MainMenuService} from '../main-menu.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import {Restaurant} from '../../models/restaurant';
import {Drink} from '../../models/drink';
import {RegistrationData} from '../../models/user-data';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  mainMenuService: MainMenuService = inject(MainMenuService);

  private http = inject(HttpClient);
  restaurantUrl: string = 'http://localhost:3000/restaurant';

  constructor() {
  }

  getRestaurantsWithCuisineAndRating(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.restaurantUrl}/restaurantsWithCuisines`);
  }

  uploadImage(image: FormData):Observable<{ url: string }> {
    return this.http.post<{ url: string }>(`${this.restaurantUrl}/uploadImage`, image);
  }

  async getRestaurantId(): Promise<number> {
    const owner_email = this.mainMenuService.getEmail();

    if (!owner_email) {
      console.error('Owner email not found');
      return -1; // fallback if email is missing
    }

    const params = new HttpParams().set('owner_email', owner_email);

    try {
      const res = await firstValueFrom(
        this.http.get<{ restaurant_id: number }>(`${this.restaurantUrl}/restaurantId`, { params })
      );
      console.log('Restaurant ID:', res.restaurant_id);
      return res.restaurant_id;
    } catch (error) {
      console.error('Failed to fetch order ID:', error);
      return -1; // fallback on error
    }
  }

  async getRestaurantAddress(): Promise<Address> {
    let restaurant_id = await this.getRestaurantId();
    const params = new HttpParams().set('id', restaurant_id);

    const res = await firstValueFrom(this.http.get<{address: Address}>(`${this.restaurantUrl}/address`, { params }));
    return res.address
  }
}
