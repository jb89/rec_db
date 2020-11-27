import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadByQuelleComponent } from './read-by-quelle.component';

describe('ReadByQuelleComponent', () => {
  let component: ReadByQuelleComponent;
  let fixture: ComponentFixture<ReadByQuelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadByQuelleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadByQuelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
