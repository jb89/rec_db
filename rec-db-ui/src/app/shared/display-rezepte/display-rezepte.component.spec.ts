import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRezepteComponent } from './display-rezepte.component';

describe('DisplayRezepteComponent', () => {
  let component: DisplayRezepteComponent;
  let fixture: ComponentFixture<DisplayRezepteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayRezepteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayRezepteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
