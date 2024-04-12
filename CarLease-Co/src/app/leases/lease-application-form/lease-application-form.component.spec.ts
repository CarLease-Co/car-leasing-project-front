import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseApplicationFormComponent } from './lease-application-form.component';

describe('LeaseApplicationFormComponent', () => {
  let component: LeaseApplicationFormComponent;
  let fixture: ComponentFixture<LeaseApplicationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaseApplicationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaseApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
