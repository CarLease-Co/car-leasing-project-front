import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedSuccessfullyComponent } from './saved-successfully.component';

describe('SavedSuccessfullyComponent', () => {
  let component: SavedSuccessfullyComponent;
  let fixture: ComponentFixture<SavedSuccessfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedSuccessfullyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavedSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
