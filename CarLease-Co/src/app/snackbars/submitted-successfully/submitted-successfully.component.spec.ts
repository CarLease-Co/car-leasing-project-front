import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedSuccessfullyComponent } from './submitted-successfully.component';

describe('SubmittedSuccessfullyComponent', () => {
  let component: SubmittedSuccessfullyComponent;
  let fixture: ComponentFixture<SubmittedSuccessfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmittedSuccessfullyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmittedSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
