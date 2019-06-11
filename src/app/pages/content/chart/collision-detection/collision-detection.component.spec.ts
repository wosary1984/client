import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollisionDetectionComponent } from './collision-detection.component';

describe('CollisionDetectionComponent', () => {
  let component: CollisionDetectionComponent;
  let fixture: ComponentFixture<CollisionDetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollisionDetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollisionDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
