import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterRezepteComponent } from './enter-rezepte.component';

describe('EnterRezepteComponent', () => {
  let component: EnterRezepteComponent;
  let fixture: ComponentFixture<EnterRezepteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterRezepteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterRezepteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
