import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProcess } from './register-process';

describe('RegisterProcess', () => {
  let component: RegisterProcess;
  let fixture: ComponentFixture<RegisterProcess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterProcess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterProcess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
