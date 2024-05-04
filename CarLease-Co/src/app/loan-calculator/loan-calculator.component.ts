import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { ROUTES } from '../enums';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    LoanCalculatorComponent,
    MatLabel,
    MatCardModule,
  ],
})
export class LoanCalculatorComponent {
  private readonly router = inject(Router);

  loanForm = new FormGroup({
    loanAmount: new FormControl(),
    loanDuration: new FormControl(),
    interestRate: new FormControl(),
  });

  get monthlyPayment(): number {
    const loanAmount = this.loanForm.value.loanAmount;
    const loanDuration = this.loanForm.value.loanDuration;
    const interestRate = this.loanForm.value.interestRate / 100;
    const months = loanDuration;
    const interestRateValue = interestRate + 1;
    const years = months / 12;
    if (!loanAmount || !loanDuration || !interestRate) {
      return 0;
    }

    const totalAmount = loanAmount * Math.pow(interestRateValue, years);
    const monthlyPayment = totalAmount / months;

    return +monthlyPayment.toFixed(2);
  }

  constructor() {}

  goLogin(): void {
    this.router.navigate([ROUTES.LOGIN]);
  }
}
