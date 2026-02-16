import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-edit-product',
  templateUrl: './restaurant-edit-product.html',
  styleUrl: './restaurant-edit-product.css',
  imports: [ReactiveFormsModule]
})
export class RestaurantEditProduct implements OnInit {

  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  apiUrl = 'http://localhost:3000/drinks';
  drinkForm: FormGroup;
  drinkId!: number;

  constructor(private fb: FormBuilder) {
    this.drinkForm = this.fb.group({
      drink_name: ['', Validators.required],
      category: ['', Validators.required],
      ingredients: [''],
      alcoholic: [false],
      price: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.drinkId = parseInt(<string>params.get('id'));
    });
    this.loadDrink();
  }

  loadDrink() {
    console.log(this.drinkId);
    this.http.get<any>(`${this.apiUrl}/drink/${this.drinkId}`)
      .subscribe(data => {
        this.drinkForm.patchValue(data);
      });
  }

  async submit() {
    if (this.drinkForm.invalid) {
      this.drinkForm.markAllAsTouched();
      return;
    }

    const payload = this.drinkForm.value;

    this.http.put(`${this.apiUrl}/${this.drinkId}`, payload)
      .subscribe(() => {
        this.router.navigate(['/restaurant/products']);
      });
  }
}
