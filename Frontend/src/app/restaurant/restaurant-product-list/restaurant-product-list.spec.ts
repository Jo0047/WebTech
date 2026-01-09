import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantProductList } from './restaurant-product-list';

describe('RestaurantProductList', () => {
  let component: RestaurantProductList;
  let fixture: ComponentFixture<RestaurantProductList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantProductList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantProductList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
