import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadByZutatComponent } from './read-by-zutat.component';

describe('ReadByZutatComponent', () => {
  let component: ReadByZutatComponent;
  let fixture: ComponentFixture<ReadByZutatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadByZutatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadByZutatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
