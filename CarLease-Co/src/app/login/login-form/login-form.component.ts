import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ERROR_MESSAGES, USER_PROPERTIES } from '../../enums';
import { EMPTY, Observable, catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoanCalculatorComponent } from '../../loan-calculator/loan-calculator.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    LoanCalculatorComponent
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  readonly loginService = inject(LoginService);
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.min(3)]),
    password: new FormControl('', Validators.required),
  });
  ERROR_MESSAGES = ERROR_MESSAGES;
  unauthorized: boolean = false;

  login(): void {
    const usernameInputValue = this.loginForm.get(
      USER_PROPERTIES.USERNAME,
    )?.value;
    const passwordInputValue = this.loginForm.get(
      USER_PROPERTIES.PASSWORD,
    )?.value;
    if (usernameInputValue && passwordInputValue) {
      this.loginService
        .login(usernameInputValue, passwordInputValue)
        .pipe(catchError(this.checkErrorStatus))
        .subscribe();
    }
  }
  private checkErrorStatus = (error: HttpErrorResponse): Observable<never> => {
    if (error.status == 401) {
      this.unauthorized = true;
      this.loginForm.reset();
    }
    return EMPTY;
  };
}
