import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveApplicationViewComponent } from './approve-application-view.component';

describe('ApproveApplicationViewComponent', () => {
  let component: ApproveApplicationViewComponent;
  let fixture: ComponentFixture<ApproveApplicationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveApplicationViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApproveApplicationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
