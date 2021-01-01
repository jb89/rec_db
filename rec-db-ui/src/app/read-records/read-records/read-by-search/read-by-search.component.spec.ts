import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadBySearchComponent } from './read-by-search.component';

describe('ReadBySearchComponent', () => {
  let component: ReadBySearchComponent;
  let fixture: ComponentFixture<ReadBySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadBySearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadBySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
