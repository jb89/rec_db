import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterZutatenComponent } from './enter-zutaten.component';

describe('EnterZutatenComponent', () => {
  let component: EnterZutatenComponent;
  let fixture: ComponentFixture<EnterZutatenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterZutatenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterZutatenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
