import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMain } from './customer-main';

describe('CustomerMain', () => {
  let component: CustomerMain;
  let fixture: ComponentFixture<CustomerMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerMain);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
