import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantOrderList } from './restaurant-order-list';

describe('RestaurantOrderList', () => {
  let component: RestaurantOrderList;
  let fixture: ComponentFixture<RestaurantOrderList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantOrderList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantOrderList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
