import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderItem } from './customer-order-item';

describe('CustomerOrderItem', () => {
  let component: CustomerOrderItem;
  let fixture: ComponentFixture<CustomerOrderItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerOrderItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerOrderItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
