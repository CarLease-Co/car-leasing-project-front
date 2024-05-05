import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, catchError, map, of, tap } from 'rxjs';
import { ID, LoanFormConfig } from '../../constants';
import { APPLICATION_STATUS, ERROR_MESSAGES, FORM_FIELDS } from '../../enums';
import { SpinnerComponent } from '../../layout/spinner/spinner.component';
import { ApplicationListService } from '../../services/application-list.service';
import { LocalStorageManagerService } from '../../services/local-storage-manager.service';
import { SavedSuccessfullyComponent } from '../../snackbars/saved-successfully/saved-successfully.component';
import { SubmittedSuccessfullyComponent } from '../../snackbars/submitted-successfully/submitted-successfully.component';
import { LeaseApplication, LeaseApplicationForm } from '../../types';

@Component({
  selector: 'app-edit-details',
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
    SpinnerComponent,
  ],
  templateUrl: './edit-details.component.html',
  styleUrl: './edit-details.component.scss',
})
export class EditDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly localStorageService = inject(LocalStorageManagerService);
  private readonly _snackBar = inject(MatSnackBar);
  protected readonly LoanFormConfig = LoanFormConfig;
  private readonly applicationId = this.activatedRoute.snapshot.params[ID];
  private readonly currentUser = this.localStorageService.storedUser();
  readonly userId = this.currentUser()?.userId;
  readonly applicationService = inject(ApplicationListService);

  uniqueCarBrands$: Observable<string[]> = of([]);
  filteredModels$: Observable<string[]> = of([]);
  filteredModels: string[] = [];

  ERROR_MESSAGES = ERROR_MESSAGES;
  unauthorized: boolean = false;

  durationInSeconds = 5;

  fetchedApplication?: LeaseApplication;

  isLoading = true;

  leaseEditForm = new FormGroup({
    userId: new FormControl(this.userId),
    monthlyIncome: new FormControl(NaN, [
      Validators.required,
      Validators.min(LoanFormConfig.minMonthlyIncome),
    ]),
    financialObligations: new FormControl(NaN, [
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
    loanDuration: new FormControl(LoanFormConfig.minLoanDuration, [
      Validators.required,
      Validators.min(LoanFormConfig.minLoanDuration),
      Validators.max(LoanFormConfig.maxLoanDuration),
    ]),
    loanAmount: new FormControl(NaN, [
      Validators.required,
      Validators.min(LoanFormConfig.minLoanAmount),
    ]),
    textExplanation: new FormControl(''),
    startDate: new FormControl(new Date().toISOString().split('T')[0]),
  });

  get makeControl(): AbstractControl<string | null, string | null> | null {
    return this.leaseEditForm.get(FORM_FIELDS.CAR_MAKE);
  }
  get modelControl(): AbstractControl<string | null, string | null> | null {
    return this.leaseEditForm.get(FORM_FIELDS.CAR_MODEL);
  }

  get loanDuration(): number | string {
    return (
      this.leaseEditForm.get(FORM_FIELDS.LOAN_DURATION)?.value ??
      FORM_FIELDS.NOT_SET
    );
  }

  get manufactureDate(): number | string {
    return (
      this.leaseEditForm.get(FORM_FIELDS.MANUFACTURE_DATE)?.value ??
      FORM_FIELDS.NOT_SET
    );
  }

  ngOnInit(): void {
    if (this.applicationId) {
      this.applicationService
        .getApplicationById(this.applicationId)
        .subscribe((application) => {
          this.fetchedApplication = application;
          this.populateFormWithApplicationData();
          this.isLoading = false;
        });
    }
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

    this.leaseEditForm.controls.carMake.valueChanges.subscribe((make) => {
      this.filteredModels$ = this.applicationService.cars$.pipe(
        map((cars) =>
          cars.filter((car) => car.make === make).map((car) => car.model),
        ),
      );
    });
  }

  onSubmit(): void {
    if (this.leaseEditForm.valid) {
      const application: LeaseApplicationForm = {
        ...this.leaseEditForm.getRawValue(),
        ...{ status: APPLICATION_STATUS.PENDING },
      };
      application.status = APPLICATION_STATUS.PENDING;
      this.applicationService
        .patchApplication(this.applicationId, application)
        .pipe(catchError(this.handleError))
        .subscribe();
    }

    this.openSubmittedSnackBar();
  }

  onSave(): void {
    if (this.leaseEditForm.valid) {
      const application: LeaseApplicationForm = {
        ...this.leaseEditForm.getRawValue(),
        ...{ status: APPLICATION_STATUS.DRAFT },
      };
      application.status = APPLICATION_STATUS.DRAFT;
      this.applicationService
        .patchApplication(this.applicationId, application)
        .pipe(catchError(this.handleError))
        .subscribe();
    }

    this.openSavedSnackBar();
  }
  private populateFormWithApplicationData() {
    if (this.fetchedApplication) {
      const {
        loanAmount,
        textExplanation,
        monthlyIncome,
        financialObligations,
        carMake,
        carModel,
        manufactureDate,
        loanDuration,
      } = this.fetchedApplication;

      this.leaseEditForm.patchValue({
        loanAmount,
        textExplanation,
        monthlyIncome,
        financialObligations,
        carMake,
        carModel,
        manufactureDate,
        loanDuration,
      });
    }
  }
  private handleError = (error: HttpErrorResponse): Observable<never> => {
    if (error) {
      this.unauthorized = true;
      this.leaseEditForm.reset();
    }
    return EMPTY;
  };

  private openSavedSnackBar(): void {
    this._snackBar.openFromComponent(SavedSuccessfullyComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
  private openSubmittedSnackBar(): void {
    this._snackBar.openFromComponent(SubmittedSuccessfullyComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
