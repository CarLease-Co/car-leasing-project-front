import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly router = inject(Router);
  // role: string | null = '';
  // ngOnInit() {
  //   const jwt = localStorage.getItem('jwt');
  //   if (jwt) {
  //     this.role = JSON.parse(jwt).role;
  //   }

  //   console.log(this.role);
  // }
  goToLeaseList(): void {
    this.router.navigate(['applications']);
  }

  goToLeaseForm(): void {
    this.router.navigate(['new-application']);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
