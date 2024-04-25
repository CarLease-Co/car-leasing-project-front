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
import { ApplicationListService } from '../../services/application-list.service';
import { map, Observable, of, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LoanFormConfig } from '../../constants';
import { FORM_FIELDS } from '../../enums';
import {LocalStorageManagerService} from "../../services/local-storage-manager.service";
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
  readonly applicationService = inject(ApplicationListService);
  private readonly localStorageService = inject(LocalStorageManagerService);
  private userId = this.localStorageService.getStoredUser()?.userId;
  uniqueCarBrands$: Observable<string[]> = of([]);
  filteredModels$: Observable<string[]> = of([]);

  leaseForm = new FormGroup({
    userId: new FormControl(this.userId),
    monthlyIncome: new FormControl(null, [
      Validators.required,
      Validators.min(LoanFormConfig.minMonthlyIncome),
    ]),
    financialObligations: new FormControl(null, [
      Validators.required,
      Validators.min(LoanFormConfig.minFinancialObligations),
    ]),
    carMake: new FormControl('', Validators.required),
    carModel: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    manufactureDate: new FormControl(LoanFormConfig.minCarYear, [
      Validators.required,
      Validators.min(LoanFormConfig.minCarYear),
      Validators.max(LoanFormConfig.maxCarYear),
    ]),
    loanDuration: new FormControl(LoanFormConfig.minLoanDuration, [
      Validators.required,
      Validators.min(LoanFormConfig.minLoanDuration),
      Validators.max(LoanFormConfig.maxLoanDuration),
    ]),
    loanAmount: new FormControl(null, [
      Validators.required,
      Validators.min(LoanFormConfig.minLoanAmount),
    ]),
    textExplanation: new FormControl(''),
    startDate: new FormControl(new Date().toISOString()),
  });

  get makeControl(): AbstractControl<string | null, string | null> | null {
    return this.leaseForm.get(FORM_FIELDS.CAR_MAKE);
  }
  get modelControl(): AbstractControl<string | null, string | null> | null {
    return this.leaseForm.get(FORM_FIELDS.CAR_MODEL);
  }

  get loanDuration(): number | string {
    return (
      this.leaseForm.get(FORM_FIELDS.LOAN_DURATION)?.value ??
      FORM_FIELDS.NOT_SET
    );
  }

  get manufactureDate(): number | string {
    return (
      this.leaseForm.get(FORM_FIELDS.MANUFACTURE_DATE)?.value ??
      FORM_FIELDS.NOT_SET
    );
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

    this.leaseForm.controls.carMake.valueChanges.subscribe((make) => {
      this.filteredModels$ = this.applicationService.cars$.pipe(
        map((cars) =>
          cars.filter((car) => car.make === make).map((car) => car.model)
        )
      );
    });
  }

  onSubmit(): void {
    if (this.leaseForm.valid) {
      this.applicationService.createApplication(this.leaseForm.getRawValue());
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

  protected readonly LoanFormConfig = LoanFormConfig;
}
