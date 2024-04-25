import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPriceModifierComponent } from './car-price-modifier.component';

describe('CarPriceModifierComponent', () => {
  let component: CarPriceModifierComponent;
  let fixture: ComponentFixture<CarPriceModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarPriceModifierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarPriceModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
