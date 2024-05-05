import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewedSuccessfullyComponent } from './reviewed-successfully.component';

describe('ReviewedSuccessfullyComponent', () => {
  let component: ReviewedSuccessfullyComponent;
  let fixture: ComponentFixture<ReviewedSuccessfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewedSuccessfullyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewedSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
