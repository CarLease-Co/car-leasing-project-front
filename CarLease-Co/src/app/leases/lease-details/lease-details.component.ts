import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { ApproveApplicationViewComponent } from "../../approve-application-view/approve-application-view.component";
import { AutosuggestorComponent } from "../../autosuggestor/autosuggestor.component";
import { EMPLOYEE_ROLE } from "../../enums";
import { ReviewApplicationViewComponent } from "../../review-application-view/review-application-view.component";
import { ApplicationListService } from '../../services/application-list.service';
import { LocalStorageManagerService } from "../../services/local-storage-manager.service";
import { LeaseApplication } from '../../types';

@Component({
  selector: 'app-lease-details',
  standalone: true,
  templateUrl: './lease-details.component.html',
  styleUrl: './lease-details.component.scss',
  imports: [MatCardModule, MatButtonModule, AutosuggestorComponent, ReviewApplicationViewComponent, ApproveApplicationViewComponent]
})
export class LeaseDetailsComponent {
  application = input<LeaseApplication>();
  readonly service = inject(ApplicationListService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly localStorageService = inject(LocalStorageManagerService);
  readonly EMPLOYEE_ROLE = EMPLOYEE_ROLE;
  role?: string;
  user = this.localStorageService.storedUser();

  ngOnInit(): void {
    const applicationId = this.activatedRoute.snapshot.params['id'];
    if (applicationId) {
      this.service.getApplicationById(applicationId);
    }
  }

}
