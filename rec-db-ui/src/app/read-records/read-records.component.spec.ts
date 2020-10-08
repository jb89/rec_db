import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadRecordsComponent } from './read-records.component';

describe('ReadRecordsComponent', () => {
  let component: ReadRecordsComponent;
  let fixture: ComponentFixture<ReadRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
