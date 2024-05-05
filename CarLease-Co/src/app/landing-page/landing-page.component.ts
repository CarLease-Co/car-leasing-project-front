import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../layout/spinner/spinner.component';
import { LoanCalculatorComponent } from '../loan-calculator/loan-calculator.component';
import { ROUTES } from '../enums';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [SpinnerComponent, LoanCalculatorComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  private readonly router = inject(Router);

  goToLogin(): void {
    this.router.navigate([ROUTES.LOGIN]);
  }
}
