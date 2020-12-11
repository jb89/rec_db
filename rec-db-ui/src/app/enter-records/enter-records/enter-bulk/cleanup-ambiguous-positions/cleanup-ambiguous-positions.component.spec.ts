import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanupAmbiguousPositionsComponent } from './cleanup-ambiguous-positions.component';

describe('CleanupAmbiguousPositionsComponent', () => {
  let component: CleanupAmbiguousPositionsComponent;
  let fixture: ComponentFixture<CleanupAmbiguousPositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleanupAmbiguousPositionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanupAmbiguousPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
