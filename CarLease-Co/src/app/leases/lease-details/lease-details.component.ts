import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { ApproveApplicationViewComponent } from '../../approve-application-view/approve-application-view.component';
import { AutosuggestorComponent } from '../../autosuggestor/autosuggestor.component';
import { ID } from '../../constants';
import { APPLICATION_STATUS, EMPLOYEE_ROLE, ROUTES } from '../../enums';
import { SpinnerComponent } from '../../layout/spinner/spinner.component';
import { ReviewApplicationViewComponent } from '../../review-application-view/review-application-view.component';
import { ApplicationListService } from '../../services/application-list.service';
import { LocalStorageManagerService } from '../../services/local-storage-manager.service';
import { DeletedSuccessfullyComponent } from '../../snackbars/deleted-successfully/deleted-successfully.component';
import { LeaseApplication } from '../../types';
@Component({
  selector: 'app-lease-details',
  standalone: true,
  imports: [
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    AutosuggestorComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    ApproveApplicationViewComponent,
    ReviewApplicationViewComponent,
    SpinnerComponent,
  ],
  templateUrl: './lease-details.component.html',
  styleUrl: './lease-details.component.scss',
})
export class LeaseDetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly localStorageService = inject(LocalStorageManagerService);
  private readonly router = inject(Router);
  readonly applicationService = inject(ApplicationListService);
  private readonly _snackBar = inject(MatSnackBar);
  readonly EMPLOYEE_ROLE = EMPLOYEE_ROLE;
  readonly APPLICATION_STATUS = APPLICATION_STATUS;
  application = input<LeaseApplication>();
  user = this.localStorageService.storedUser();
  fetchedApplication?: LeaseApplication;
  isLoading = true;
  durationInSeconds = 5;

  ngOnInit(): void {
    const applicationId = this.activatedRoute.snapshot.params[ID];
    if (applicationId) {
      this.applicationService
        .getApplicationById(applicationId)
        .pipe(
          tap((application) => {
            this.fetchedApplication = application;
            this.isLoading = false;
          }),
        )
        .subscribe();
    }
  }
  delete(): void {
    this.applicationService
      .deleteApplication(this.applicationService.application$.getValue()?.id)
      .pipe(catchError(this.handleError))
      .subscribe();
    this.openDeletedSnackBar();
  }
  edit(): void {
    this.router.navigate([
      ROUTES.EDIT_APPLICATION,
      this.fetchedApplication?.id,
    ]);
  }

  private handleError = (error: HttpErrorResponse): Observable<never> => {
    if (error) {
      console.log('ERROR', error.error);
    }
    return EMPTY;
  };

  private openDeletedSnackBar(): void {
    this._snackBar.openFromComponent(DeletedSuccessfullyComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
