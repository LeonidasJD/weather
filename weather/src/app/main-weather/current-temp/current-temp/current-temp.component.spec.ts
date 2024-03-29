import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTempComponent } from './current-temp.component';

describe('CurrentTempComponent', () => {
  let component: CurrentTempComponent;
  let fixture: ComponentFixture<CurrentTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentTempComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
