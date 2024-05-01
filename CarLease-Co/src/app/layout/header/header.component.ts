import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { EMPLOYEE_ROLE, ROUTES } from '../../enums';
import { LocalStorageManagerService } from '../../services/local-storage-manager.service';

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
  goToAutosuggestorForm(): void {
    this.router.navigate([ROUTES.AUTOSUGGESTOR_FORM]);
  }
  goToCarPriceModifier(): void {
    this.router.navigate([ROUTES.CAR_PRICE_MODIFIER]);
  }
  logout(): void {
    this.localStorageService.logout();
    this.router.navigate([ROUTES.LOGIN]);
  }
}
