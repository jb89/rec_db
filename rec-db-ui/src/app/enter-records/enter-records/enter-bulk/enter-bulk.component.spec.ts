import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterBulkComponent } from './enter-bulk.component';

describe('EnterBulkComponent', () => {
  let component: EnterBulkComponent;
  let fixture: ComponentFixture<EnterBulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterBulkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
