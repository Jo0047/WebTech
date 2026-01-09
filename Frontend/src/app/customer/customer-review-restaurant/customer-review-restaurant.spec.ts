import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReviewRestaurant } from './customer-review-restaurant';

describe('CustomerReviewRestaurant', () => {
  let component: CustomerReviewRestaurant;
  let fixture: ComponentFixture<CustomerReviewRestaurant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerReviewRestaurant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerReviewRestaurant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
