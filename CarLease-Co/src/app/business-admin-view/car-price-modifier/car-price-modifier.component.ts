import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { EMPTY, Observable, catchError, map, of, tap } from 'rxjs';
import { LoanFormConfig } from '../../constants';
import { CAR_FORM_FIELDS, ERROR_MESSAGES } from '../../enums';
import { ApplicationListService } from '../../services/application-list.service';
import { BusAdminService } from '../../services/bus-admin.service';

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
  private readonly busAdminService = inject(BusAdminService);
  readonly applicationService = inject(ApplicationListService);
  uniqueCarBrands$: Observable<string[]> = of([]);
  filteredModels$: Observable<string[]> = of([]);
  carPriceForm = new FormGroup({
    make: new FormControl('', Validators.required),
    model: new FormControl({ value: '', disabled: true }, Validators.required),
    priceFrom: new FormControl(null, [
      Validators.required,
      Validators.min(LoanFormConfig.minCarPrice),
    ]),
    priceTo: new FormControl(null, [
      Validators.required,
      Validators.min(LoanFormConfig.minCarPrice),
    ]),
  });

  ERROR_MESSAGES = ERROR_MESSAGES;
  unauthorized: boolean = false;

  get makeControl(): AbstractControl<string | null, string | null> | null {
    return this.carPriceForm.get(CAR_FORM_FIELDS.CAR_MAKE);
  }
  get modelControl(): AbstractControl<string | null, string | null> | null {
    return this.carPriceForm.get(CAR_FORM_FIELDS.CAR_MODEL);
  }

  ngOnInit(): void {
    this.applicationService.getCars();
    this.makeControl?.valueChanges
      .pipe(
        tap((make) => {
          make ? this.modelControl?.enable() : this.modelControl?.disable();
        }),
      )
      .subscribe();
    this.uniqueCarBrands$ = this.applicationService.cars$.pipe(
      map((cars) => cars.map((car) => car.make)),
      map((brands) => Array.from(new Set(brands))),
    );

    this.carPriceForm.controls.make.valueChanges.subscribe((make) => {
      this.filteredModels$ = this.applicationService.cars$.pipe(
        map((cars) =>
          cars.filter((car) => car.make === make).map((car) => car.model),
        ),
      );
    });
  }
  onSubmit(): void {
    if (this.carPriceForm.valid) {
      this.busAdminService
        .adjustCarPrices(this.carPriceForm.getRawValue())
        .pipe(catchError(this.handleError))
        .subscribe();
    }
  }
  private handleError = (error: HttpErrorResponse): Observable<never> => {
    if (error) {
      this.unauthorized = true;
      this.carPriceForm.reset();
    }
    return EMPTY;
  };
}
