import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekTempComponent } from './week-temp.component';

describe('WeekTempComponent', () => {
  let component: WeekTempComponent;
  let fixture: ComponentFixture<WeekTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekTempComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
