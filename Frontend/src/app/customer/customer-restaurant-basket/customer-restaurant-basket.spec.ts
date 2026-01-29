import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRestaurantBasket } from './customer-restaurant-basket';

describe('CustomerRestaurantBasket', () => {
  let component: CustomerRestaurantBasket;
  let fixture: ComponentFixture<CustomerRestaurantBasket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerRestaurantBasket]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerRestaurantBasket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
