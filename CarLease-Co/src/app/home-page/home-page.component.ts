import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../enums';
import { environment } from '../environment';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  environment = environment;

  constructor(private router: Router) {}

  redirectToLeaseApplicationForm() {
    this.router.navigate([ROUTES.NEW_APPLICATION]);
  }
}
