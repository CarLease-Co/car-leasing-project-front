import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';

@Component({
  selector: 'app-crumbs',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  templateUrl: './crumbs.component.html',
  styleUrl: './crumbs.component.scss',
})
export class CrumbsComponent {
  private readonly breadcrumbService = inject(BreadcrumbsService);
  breadcrumbs = this.breadcrumbService.breadcrumbs();
}
