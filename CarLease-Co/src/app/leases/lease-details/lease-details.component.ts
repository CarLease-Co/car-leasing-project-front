import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LeaseApplication } from '../../types';
import { ApplicationListService } from '../../services/application-list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lease-details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './lease-details.component.html',
  styleUrl: './lease-details.component.scss',
})
export class LeaseDetailsComponent {
  application = input<LeaseApplication>();
  readonly service = inject(ApplicationListService);
  private readonly activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const applicationId = this.activatedRoute.snapshot.params['id'];
    if (applicationId) {
      this.service.getApplicationById(applicationId);
    }
  }
}
