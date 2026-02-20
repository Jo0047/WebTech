import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantEditProduct } from './restaurant-edit-product';

describe('RestaurantEditProduct', () => {
  let component: RestaurantEditProduct;
  let fixture: ComponentFixture<RestaurantEditProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantEditProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantEditProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
