import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
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
import { EMPTY, Observable, catchError } from 'rxjs';
import {
  AutosuggestorFormConfig,
  CONVERT_FROM_PERCENTAGE_VALUE,
  PERCENTAGE_PRECISION_VALUE,
} from '../../constants';
import { ERROR_MESSAGES } from '../../enums';
import { BusAdminService } from '../../services/bus-admin.service';
import { SubmittedSuccessfullyComponent } from '../../snackbars/submitted-successfully/submitted-successfully.component';

@Component({
  selector: 'app-autosuggestor-form',
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
  templateUrl: './autosuggestor-form.component.html',
  styleUrl: './autosuggestor-form.component.scss',
})
export class AutosuggestorFormComponent {
  private readonly busAdminService = inject(BusAdminService);
  private readonly _snackBar = inject(MatSnackBar);
  autosuggestorForm = inject(NonNullableFormBuilder).group({
    rate: [
      undefined as undefined | number,
      [
        Validators.required,
        Validators.min(AutosuggestorFormConfig.minMonthlyExpenses),
      ],
    ],
    interestFrom: [
      undefined as undefined | number,
      [
        Validators.required,
        Validators.min(AutosuggestorFormConfig.minInterestPercentage),
        Validators.max(AutosuggestorFormConfig.maxInterestPercentage),
      ],
    ],
    interestTo: [
      undefined as undefined | number,
      [
        Validators.required,
        Validators.min(AutosuggestorFormConfig.minInterestPercentage),
        Validators.max(AutosuggestorFormConfig.maxInterestPercentage),
      ],
    ],
    yearFrom: [
      AutosuggestorFormConfig.minCarYear,
      [
        Validators.required,
        Validators.min(AutosuggestorFormConfig.minCarYear),
        Validators.max(AutosuggestorFormConfig.maxCarYear),
      ],
    ],
    yearTo: [
      AutosuggestorFormConfig.maxCarYear,
      [
        Validators.required,
        Validators.min(AutosuggestorFormConfig.minCarYear),
        Validators.max(AutosuggestorFormConfig.maxCarYear),
      ],
    ],
  });

  ERROR_MESSAGES = ERROR_MESSAGES;
  unauthorized: boolean = false;

  durationInSeconds = 5;

  onSubmit(): void {
    if (this.autosuggestorForm.valid) {
      this.updateInterestRate();
      this.busAdminService
        .adjustAutosuggestor(this.autosuggestorForm.getRawValue())
        .pipe(catchError(this.handleError))
        .subscribe();
    }

    this.openSubmittedSnackBar();
  }
  updateInterestRate() {
    this.autosuggestorForm.value.interestFrom = this.getInterestDecimal(
      this.autosuggestorForm.value.interestFrom,
    );
    this.autosuggestorForm.value.interestTo = this.getInterestDecimal(
      this.autosuggestorForm.value.interestTo,
    );
  }
  private getInterestDecimal(
    interestPercentage: number | undefined | null,
  ): number | undefined {
    if (interestPercentage) {
      const interestDecimal: string = (
        interestPercentage / CONVERT_FROM_PERCENTAGE_VALUE
      ).toFixed(PERCENTAGE_PRECISION_VALUE);
      return Number(interestDecimal);
    }
    return undefined;
  }
  private handleError = (error: HttpErrorResponse): Observable<never> => {
    if (error) {
      this.unauthorized = true;
      this.autosuggestorForm.reset();
    }
    return EMPTY;
  };
  private openSubmittedSnackBar(): void {
    this._snackBar.openFromComponent(SubmittedSuccessfullyComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
