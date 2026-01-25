import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMain } from './restaurant-main';

describe('RestaurantMain', () => {
  let component: RestaurantMain;
  let fixture: ComponentFixture<RestaurantMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantMain);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
