import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantNewProduct } from './restaurant-new-product';

describe('RestaurantNewProduct', () => {
  let component: RestaurantNewProduct;
  let fixture: ComponentFixture<RestaurantNewProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantNewProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantNewProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
