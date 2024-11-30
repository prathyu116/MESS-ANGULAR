import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealManagementComponent } from './meal-management.component';

describe('MealManagementComponent', () => {
  let component: MealManagementComponent;
  let fixture: ComponentFixture<MealManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealManagementComponent]
    });
    fixture = TestBed.createComponent(MealManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
