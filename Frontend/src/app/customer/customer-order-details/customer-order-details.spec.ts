import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderDetails } from './customer-order-details';

describe('CustomerOrderDetails', () => {
  let component: CustomerOrderDetails;
  let fixture: ComponentFixture<CustomerOrderDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerOrderDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerOrderDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
