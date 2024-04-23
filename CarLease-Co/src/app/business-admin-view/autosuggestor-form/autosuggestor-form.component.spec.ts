import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutosuggestorFormComponent } from './autosuggestor-form.component';

describe('AutosuggestorFormComponent', () => {
  let component: AutosuggestorFormComponent;
  let fixture: ComponentFixture<AutosuggestorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutosuggestorFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutosuggestorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
