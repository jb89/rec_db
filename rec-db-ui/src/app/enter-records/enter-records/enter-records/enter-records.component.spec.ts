import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterRecordsComponent } from './enter-records.component';

describe('EnterRecordsComponent', () => {
  let component: EnterRecordsComponent;
  let fixture: ComponentFixture<EnterRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
