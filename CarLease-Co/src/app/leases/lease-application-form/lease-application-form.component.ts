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
import { APPLICATION_STATUS, ERROR_MESSAGES, FORM_FIELDS } from '../../enums';
import { ApplicationListService } from '../../services/application-list.service';
import { LocalStorageManagerService } from '../../services/local-storage-manager.service';
import { LeaseApplicationForm } from '../../types';
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
  private readonly currentUser = this.localStorageService.storedUser();

  private userId = this.currentUser()?.userId;
  protected readonly LoanFormConfig = LoanFormConfig;

  uniqueCarBrands$: Observable<string[]> = of([]);
  filteredModels$: Observable<string[]> = of([]);

  ERROR_MESSAGES = ERROR_MESSAGES;
  unauthorized: boolean = false;

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
      Validators.required,
    ),
    manufactureDate: new FormControl(LoanFormConfig.minCarYear, [
      Validators.required,
      Validators.min(LoanFormConfig.minCarYear),
      Validators.max(LoanFormConfig.maxCarYear),
    ]),
    textExplanation: new FormControl(''),
    loanDuration: new FormControl(LoanFormConfig.minLoanDuration, [
      Validators.required,
      Validators.min(LoanFormConfig.minLoanDuration),
      Validators.max(LoanFormConfig.maxLoanDuration),
    ]),
    loanAmount: new FormControl(null, [
      Validators.required,
      Validators.min(LoanFormConfig.minLoanAmount),
    ]),
    startDate: new FormControl(new Date().toISOString().split('T')[0]),
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
        }),
      )
      .subscribe();
    this.uniqueCarBrands$ = this.applicationService.cars$.pipe(
      map((cars) => cars.map((car) => car.make)),
      map((brands) => Array.from(new Set(brands))),
    );

    this.leaseForm.controls.carMake.valueChanges.subscribe((make) => {
      this.filteredModels$ = this.applicationService.cars$.pipe(
        map((cars) =>
          cars.filter((car) => car.make === make).map((car) => car.model),
        ),
      );
    });
  }

  onSubmit(): void {
    if (this.leaseForm.valid) {
      const application: LeaseApplicationForm = {
        ...this.leaseForm.getRawValue(),
        ...{ status: APPLICATION_STATUS.PENDING },
      };
      application.status = APPLICATION_STATUS.PENDING;
      this.applicationService
        .createApplication(application)
        .pipe(catchError(this.handleError))
        .subscribe();
    }
  }
  onSave(): void {
    if (this.leaseForm.valid) {
      const application: LeaseApplicationForm = {
        ...this.leaseForm.getRawValue(),
        ...{ status: APPLICATION_STATUS.DRAFT },
      };
      application.status = APPLICATION_STATUS.DRAFT;
      this.applicationService
        .createApplication(application)
        .pipe(catchError(this.handleError))
        .subscribe();
    }
  }
  private handleError = (error: HttpErrorResponse): Observable<never> => {
    if (error) {
      this.unauthorized = true;
      this.leaseForm.reset();
    }
    return EMPTY;
  };
}
