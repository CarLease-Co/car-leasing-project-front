import { Component, inject } from '@angular/core';
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
import {map, Observable, tap} from 'rxjs';

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
  ],
  templateUrl: './lease-application-form.component.html',
  styleUrls: ['./lease-application-form.component.scss'],
})
export class LeaseApplicationFormComponent {
  uniqueCarBrands!: Observable<string[]>;

  leaseForm = new FormGroup({
    userId: new FormControl(1),
    monthlyIncome: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
    financialObligations: new FormControl('', [
      Validators.required,
      Validators.min(1),
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
    loanAmount: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
    textExplanation: new FormControl(''),
    startDate: new FormControl(new Date().toISOString().split('T')[0]),
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
    this.uniqueCarBrands = this.service.cars$.pipe(
      map(cars => cars.map(car => car.make)), // Extract brands
      map(brands => Array.from(new Set(brands))) // Remove duplicates and create an array from the Set
    );
  }

  onSubmit() {
    console.log('Form submitted:', this.leaseForm.value);
  }
}
