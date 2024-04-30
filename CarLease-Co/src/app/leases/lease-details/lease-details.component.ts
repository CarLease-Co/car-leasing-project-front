import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LeaseApplication } from '../../types';
import { ApplicationListService } from '../../services/application-list.service';
import { ActivatedRoute } from '@angular/router';
import { AutosuggestorComponent } from "../../autosuggestor/autosuggestor.component";
import { EMPLOYEE_ROLE } from "../../enums";
import { LocalStorageManagerService } from "../../services/local-storage-manager.service";

@Component({
  selector: 'app-lease-details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, AutosuggestorComponent],
  templateUrl: './lease-details.component.html',
  styleUrl: './lease-details.component.scss',
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
