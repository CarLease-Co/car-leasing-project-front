import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../enums';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(private router: Router) {}

  redirectToLeaseApplicationForm() {
    this.router.navigate([ROUTES.NEW_APPLICATION]);
  }
}
