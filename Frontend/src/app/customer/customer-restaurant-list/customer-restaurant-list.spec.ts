import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRestaurantList } from './customer-restaurant-list';

describe('CustomerRestaurantList', () => {
  let component: CustomerRestaurantList;
  let fixture: ComponentFixture<CustomerRestaurantList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerRestaurantList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerRestaurantList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
