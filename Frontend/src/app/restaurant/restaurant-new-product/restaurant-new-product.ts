import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-restaurant-new-product',
  templateUrl: './restaurant-new-product.html',
  styleUrl: './restaurant-new-product.css',
  imports: [
    ReactiveFormsModule
  ]
})
export class RestaurantNewProduct {
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

  submit() {
    if (this.drinkForm.invalid) {
      this.drinkForm.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.drinkForm.value,
      // todo getRestaurant id from Service
      restaurant_id: 1,
    };

    console.log('New drink:', payload);

    // TODO: send payload to backend
  }
}
