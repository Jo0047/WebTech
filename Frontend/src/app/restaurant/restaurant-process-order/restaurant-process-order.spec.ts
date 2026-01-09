import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantProcessOrder } from './restaurant-process-order';

describe('RestaurantProcessOrder', () => {
  let component: RestaurantProcessOrder;
  let fixture: ComponentFixture<RestaurantProcessOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantProcessOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantProcessOrder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
