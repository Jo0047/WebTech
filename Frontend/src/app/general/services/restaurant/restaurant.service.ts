import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Restaurant} from '@models/restaurant';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private http = inject(HttpClient);
  apiUrl: string = 'http://localhost:3000/restaurant';

  constructor() {}

  getRestaurantsWithCuisineAndRating(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/restaurantsWithCuisines`);
  }
}
