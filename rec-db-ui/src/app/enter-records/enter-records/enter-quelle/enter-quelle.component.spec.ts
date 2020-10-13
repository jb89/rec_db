import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterQuelleComponent } from './enter-quelle.component';

describe('EnterQuelleComponent', () => {
  let component: EnterQuelleComponent;
  let fixture: ComponentFixture<EnterQuelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterQuelleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterQuelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
