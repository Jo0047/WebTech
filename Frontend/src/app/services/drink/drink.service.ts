import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Drink} from '../../models/drink';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DrinkService {

  private http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/drinks';

  getDrinksByRestaurant(restaurantId: number | undefined): Observable<Drink[]> {
    return this.http.get<Drink[]>(`${this.apiUrl}/${restaurantId}`);
  }
}
