import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseApplicationsListComponent } from './lease-applications-list.component';

describe('LeaseApplicationsListComponent', () => {
  let component: LeaseApplicationsListComponent;
  let fixture: ComponentFixture<LeaseApplicationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaseApplicationsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaseApplicationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
