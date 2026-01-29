import {inject, Injectable} from '@angular/core';
import {MainMenuService} from './main-menu.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  mainMenuService: MainMenuService = inject(MainMenuService);

  http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/get/';


  constructor() {
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
        this.http.get<{ restaurant_id: number }>(this.apiUrl + 'restaurantId', { params })
      );
      console.log('Restaurant ID:', res.restaurant_id);
      return res.restaurant_id;
    } catch (error) {
      console.error('Failed to fetch customer ID:', error);
      return -1; // fallback on error
    }
  }

}
