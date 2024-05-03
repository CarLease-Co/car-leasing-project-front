import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { AutosuggestorComponent } from '../autosuggestor/autosuggestor.component';
import { ID } from '../constants';
import { APPLICATION_STATUS, ROUTES } from '../enums';
import { ApplicationListService } from '../services/application-list.service';
import { LeaseApplication } from '../types';

@Component({
  selector: 'app-approve-application-view',
  standalone: true,
  imports: [MatRadioModule,
    MatButtonModule,
    AutosuggestorComponent, FormsModule],
  templateUrl: './approve-application-view.component.html',
  styleUrl: './approve-application-view.component.scss'
})
export class ApproveApplicationViewComponent {
  selectedValue: string = '';
  readonly applicationService = inject(ApplicationListService);
  readonly APPLICATION_STATUS = APPLICATION_STATUS;
  application = input<LeaseApplication>();
  fetchedApplication?: LeaseApplication;
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  applicationId = this.activatedRoute.snapshot.params[ID];

  submitForm() {
    const currentStatus: string | undefined = this.fetchedApplication?.status;
    let newStatus: APPLICATION_STATUS;

    if (this.selectedValue === "approve" && currentStatus === APPLICATION_STATUS.REVIEW_APPROVED) {
      newStatus = APPLICATION_STATUS.APPROVED;
    } else if (this.selectedValue === "approve" && currentStatus === APPLICATION_STATUS.REVIEW_DECLINED) {
      newStatus = APPLICATION_STATUS.DECLINED;
    } else if (this.selectedValue === "decline" && currentStatus === APPLICATION_STATUS.REVIEW_APPROVED) {
      console.log("3", this.selectedValue, currentStatus)
      newStatus = APPLICATION_STATUS.PENDING;
    } else {
      newStatus = APPLICATION_STATUS.PENDING;
    }

    this.applicationService.updateApplicationStatus(newStatus, this.applicationId).subscribe({
      next: () => {
        this.router.navigate([ROUTES.APPLICATIONS]);
      },
    });

  }

  ngOnInit(): void {
    if (this.applicationId) {
      this.applicationService
        .getApplicationById(this.applicationId)
        .subscribe((application) => {
          this.fetchedApplication = application;
        });
    }

  }
}
