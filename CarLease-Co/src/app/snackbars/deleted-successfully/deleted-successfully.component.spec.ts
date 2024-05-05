import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedSuccessfullyComponent } from './deleted-successfully.component';

describe('DeletedSuccessfullyComponent', () => {
  let component: DeletedSuccessfullyComponent;
  let fixture: ComponentFixture<DeletedSuccessfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletedSuccessfullyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletedSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
