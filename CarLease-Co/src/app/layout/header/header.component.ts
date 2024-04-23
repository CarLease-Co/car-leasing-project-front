import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { LocalStorageManagerService } from '../../services/local-storage-manager.service';
import { EMPLOYEE_ROLE } from '../../enums';

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
  role: string | undefined;
  readonly EMPLOYEE_ROLE = EMPLOYEE_ROLE;
  ngOnInit() {}
  goToLeaseList(): void {
    this.router.navigate(['applications']);
  }

  goToLeaseForm(): void {
    this.router.navigate(['new-application']);
  }
  goToSysAdminView(): void {
    this.router.navigate(['sysadmin-view']);
  }
  goToBusAdminView(): void {
    this.router.navigate(['autosuggestor-form']);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
