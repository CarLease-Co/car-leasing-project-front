import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { ApplicationListService } from '../../services/application-list.service';
import { Observable, map, of, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FORM_FIELDS } from '../../enums';

@Component({
  selector: 'app-car-price-modifier',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatSliderModule,
    MatButtonModule,
    AsyncPipe,
  ],
  templateUrl: './car-price-modifier.component.html',
  styleUrl: './car-price-modifier.component.scss',
})
export class CarPriceModifierComponent {
  readonly applicationService = inject(ApplicationListService);
  uniqueCarBrands$: Observable<string[]> = of([]);
  filteredModels$: Observable<string[]> = of([]);
  carPriceForm = new FormGroup({
    carMake: new FormControl('', Validators.required),
    carModel: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    minCarPrice: new FormControl('', [Validators.required, Validators.min(1)]),
    maxCarPrice: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  get makeControl(): AbstractControl<string | null, string | null> | null {
    return this.carPriceForm.get(FORM_FIELDS.CAR_MAKE);
  }
  get modelControl(): AbstractControl<string | null, string | null> | null {
    return this.carPriceForm.get(FORM_FIELDS.CAR_MODEL);
  }

  ngOnInit(): void {
    this.applicationService.getCars();
    this.makeControl?.valueChanges
      .pipe(
        tap((make) => {
          make ? this.modelControl?.enable() : this.modelControl?.disable();
        })
      )
      .subscribe();
    this.uniqueCarBrands$ = this.applicationService.cars$.pipe(
      map((cars) => cars.map((car) => car.make)),
      map((brands) => Array.from(new Set(brands)))
    );

    this.carPriceForm.controls.carMake.valueChanges.subscribe((make) => {
      this.filteredModels$ = this.applicationService.cars$.pipe(
        map((cars) =>
          cars.filter((car) => car.make === make).map((car) => car.model)
        )
      );
    });
  }
  onSubmit() {
    this.carPriceForm.reset();
  }
}
