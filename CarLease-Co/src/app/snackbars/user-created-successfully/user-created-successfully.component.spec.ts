import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreatedSuccessfullyComponent } from './user-created-successfully.component';

describe('UserCreatedSuccessfullyComponent', () => {
  let component: UserCreatedSuccessfullyComponent;
  let fixture: ComponentFixture<UserCreatedSuccessfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCreatedSuccessfullyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCreatedSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
