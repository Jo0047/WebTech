import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {RestaurantService} from '../../services/restaurant/restaurant.service';

@Component({
  selector: 'app-order-new-product',
  templateUrl: './restaurant-new-product.html',
  styleUrl: './restaurant-new-product.css',
  imports: [
    ReactiveFormsModule
  ]
})
export class RestaurantNewProduct {
  private http = inject(HttpClient);
  restaurantService: RestaurantService = inject(RestaurantService);
  apiUrl = 'http://localhost:3000/data/drink';
  drinkForm: FormGroup;

  categories = [
    'Soft drink',
    'Cocktail',
    'Beer',
    'Wine',
    'Coffee',
    'Tea',
  ];

  constructor(private fb: FormBuilder) {
    this.drinkForm = this.fb.group({
      drink_name: ['', Validators.required],
      category: ['', Validators.required],
      ingredients: [''],
      alcoholic: [false],
      price: [null, [Validators.required, Validators.min(0)]],
    });
  }

  async submit() {
    if (this.drinkForm.invalid) {
      this.drinkForm.markAllAsTouched();
      return;
    }
    let id = await this.restaurantService.getRestaurantId()
    const payload = {
      ...this.drinkForm.value,
      restaurant_id: id,
    };


    this.http.post(this.apiUrl, payload).subscribe()
  }
}
