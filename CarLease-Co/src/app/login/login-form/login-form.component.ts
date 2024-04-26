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
import { ErrorMessages } from '../../constants';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AUTHORIZATION, USER_PROPERTIES } from '../../enums';

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
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  readonly loginService = inject(LoginService);
  readonly AUTHORIZATION = AUTHORIZATION;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.min(3)]),
    password: new FormControl('', Validators.required),
  });
  errorMessages = ErrorMessages;
  unauthorized: boolean = false;

  login(): void {
    const usernameInputValue = this.loginForm.get(
      USER_PROPERTIES.USERNAME,
    )?.value;
    const passwordInputValue = this.loginForm.get(
      USER_PROPERTIES.PASSWORD,
    )?.value;
    if (usernameInputValue && passwordInputValue) {
      this.loginService.login(usernameInputValue, passwordInputValue).subscribe(
        (response) => response,
        (err) => {
          if (err.status == 401) {
            this.unauthorized = true;
            this.loginForm.reset();
          }
        },
      );
    }
  }
}
