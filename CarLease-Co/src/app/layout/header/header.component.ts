import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { LocalStorageManagerService } from '../../services/local-storage-manager.service';
import { EMPLOYEE_ROLE, ROUTES } from '../../enums';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageManagerService);
  readonly EMPLOYEE_ROLE = EMPLOYEE_ROLE;
  role?: string;
  user = this.localStorageService.storedUser();

  goToLeaseList(): void {
    this.router.navigate([ROUTES.APPLICATIONS]);
  }

  goToLeaseForm(): void {
    this.router.navigate([ROUTES.NEW_APPLICATION]);
  }
  goToSysAdminView(): void {
    this.router.navigate([ROUTES.SYS_ADMIN_VIEW]);
  }
  goToBusAdminView(): void {
    this.router.navigate([ROUTES.AUTOSUGGESTOR_FORM]);
  }
  logout(): void {
    localStorage.clear();
    this.router.navigate([ROUTES.LOGIN]);
  }
}
