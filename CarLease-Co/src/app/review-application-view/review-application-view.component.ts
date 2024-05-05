import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AutosuggestorComponent } from '../autosuggestor/autosuggestor.component';
import { ID } from '../constants';
import { APPLICATION_STATUS, ROUTES } from '../enums';
import { ApplicationListService } from '../services/application-list.service';
import { ReviewedSuccessfullyComponent } from '../snackbars/reviewed-successfully/reviewed-successfully.component';
import { LeaseApplication } from '../types';

@Component({
  selector: 'app-review-application-view',
  standalone: true,
  templateUrl: './review-application-view.component.html',
  styleUrl: './review-application-view.component.scss',
  imports: [
    MatRadioModule,
    MatButtonModule,
    AutosuggestorComponent,
    FormsModule,
  ],
})
export class ReviewApplicationViewComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly _snackBar = inject(MatSnackBar);
  readonly applicationService = inject(ApplicationListService);
  readonly APPLICATION_STATUS = APPLICATION_STATUS;
  application = input<LeaseApplication>();
  fetchedApplication?: LeaseApplication;
  selectedValue: string = '';
  durationInSeconds = 5;

  submitForm() {
    const applicationId = this.activatedRoute.snapshot.params[ID];

    let status: APPLICATION_STATUS;
    if (this.selectedValue == 'approve') {
      status = APPLICATION_STATUS.REVIEW_APPROVED;
    } else {
      status = APPLICATION_STATUS.REVIEW_DECLINED;
    }

    this.applicationService
      .updateApplicationStatus(status, applicationId)
      .subscribe({
        next: () => {
          this.router.navigate([ROUTES.APPLICATIONS]);
        },
      });
    this.openReviewedSnackBar();
  }
  private openReviewedSnackBar(): void {
    this._snackBar.openFromComponent(ReviewedSuccessfullyComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
