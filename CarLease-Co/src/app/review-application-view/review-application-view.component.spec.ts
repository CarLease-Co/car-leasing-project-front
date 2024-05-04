import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewApplicationViewComponent } from './review-application-view.component';

describe('ReviewApplicationViewComponent', () => {
  let component: ReviewApplicationViewComponent;
  let fixture: ComponentFixture<ReviewApplicationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewApplicationViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewApplicationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
