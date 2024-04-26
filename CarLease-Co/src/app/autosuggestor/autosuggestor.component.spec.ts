import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutosuggestorComponent } from './autosuggestor.component';

describe('AutosuggestorComponent', () => {
  let component: AutosuggestorComponent;
  let fixture: ComponentFixture<AutosuggestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutosuggestorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutosuggestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
