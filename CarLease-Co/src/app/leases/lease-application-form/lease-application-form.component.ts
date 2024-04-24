import { Component, inject } from '@angular/core';
import { Car } from '../../types';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ApplicationListService } from '../../services/application-list.service';
import { filter, map, Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-lease-application-form',
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
  templateUrl: './lease-application-form.component.html',
  styleUrls: ['./lease-application-form.component.scss'],
})
export class LeaseApplicationFormComponent {
  uniqueCarBrands$!: Observable<string[]>;
  filteredModels$!: Observable<string[]>;
  leaseForm = new FormGroup({
    userId: new FormControl(1),
    monthlyIncome: new FormControl(null, [
      Validators.required,
      Validators.min(1),
    ]),
    financialObligations: new FormControl(null, [
      Validators.required,
      Validators.min(0),
    ]),
    carMake: new FormControl('', Validators.required),
    carModel: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    manufactureDate: new FormControl(1994, [
      Validators.required,
      Validators.min(1994),
      Validators.max(2024),
    ]),
    loanDuration: new FormControl(3, [
      Validators.required,
      Validators.min(3),
      Validators.max(68),
    ]),
    loanAmount: new FormControl(null, [Validators.required, Validators.min(1)]),
    textExplanation: new FormControl(''),
    startDate: new FormControl(new Date().toISOString()),
  });
  private readonly router = inject(Router);
  readonly service = inject(ApplicationListService);
  get makeControl(): AbstractControl<string | null, string | null> | null {
    return this.leaseForm.get('carMake');
  }
  get modelControl(): AbstractControl<string | null, string | null> | null {
    return this.leaseForm.get('carModel');
  }

  ngOnInit(): void {
    this.service.getCars();
    this.makeControl?.valueChanges
      .pipe(
        tap((make) => {
          make ? this.modelControl?.enable() : this.modelControl?.disable();
        })
      )
      .subscribe();
    this.uniqueCarBrands$ = this.service.cars$.pipe(
      map((cars) => cars.map((car) => car.make)),
      map((brands) => Array.from(new Set(brands)))
    );

    this.leaseForm.controls.carMake.valueChanges.subscribe((make) => {
      this.filteredModels$ = this.service.cars$.pipe(
        map((cars) =>
          cars.filter((car) => car.make === make).map((car) => car.model)
        )
      );
    });
  }

  onSubmit(): void {
    if (this.leaseForm.valid) {
      this.service.createApplication(this.leaseForm.getRawValue());
      this.leaseForm.reset();
      this.leaseForm.setErrors(null);
    }
  }
  resetForm(): void {
    this.leaseForm.reset({
      loanAmount: null,
      loanDuration: 3,
      monthlyIncome: null,
      financialObligations: null,
      carMake: null,
      carModel: null,
      manufactureDate: 1994,
      textExplanation: '',
    });
  }
}
