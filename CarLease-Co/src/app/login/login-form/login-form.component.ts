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
import { Router } from '@angular/router';
import { User } from '../../types';
import { LoginService } from '../../services/login.service';
export const users: User[] = [
  {
    id: 1,
    name: 'Tomas',
    surname: 'Tomauskas',
    role: 'APPLICANT',
    username: 'tomux',
    email: 'teamcarlease@gmail.com',
    jwt: 'imapplicant',
    password: 'applicant1',
  },
  {
    id: 2,
    name: 'Rokas',
    surname: 'Rokelis',
    role: 'APPLICANT',
    username: 'rokis',
    email: 'teamcarlease@gmail.com',
    jwt: 'imapplicant2',
    password: 'applicant2',
  },
  {
    id: 3,
    name: 'Edgaras',
    surname: 'Edgaravicius',
    role: 'REVIEWER',
    username: 'edgaras',
    email: 'teamcarlease@gmail.com',
    jwt: 'imreviewer',
    password: 'reviewer',
  },
  {
    id: 4,
    name: 'Mantas',
    surname: 'Mantelis',
    role: 'APPROVER',
    username: 'mantelis',
    email: 'teamcarlease@gmail.com',
    jwt: 'imapprover',
    password: 'approver',
  },
  {
    id: 5,
    name: 'Ruta',
    surname: 'Rutauskaite',
    role: 'BUSINESS_ADMIN',
    username: 'rutele',
    email: 'teamcarlease@gmail.com',
    jwt: 'imbusadmin',
    password: 'busadmin',
  },
  {
    id: 6,
    name: 'Vaiva',
    surname: 'Vaivauskaite',
    role: 'SYSTEM_ADMIN',
    username: 'vaivux',
    email: 'teamcarlease@gmail.com',
    jwt: 'imsysadmin',
    password: 'sysadmin',
  },
];
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
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.min(3)]),
    password: new FormControl('', Validators.required),
  });
  private readonly router = inject(Router);
  readonly service = inject(LoginService);
  ngOnInit() {
    console.log(users);
  }
  login() {
    const usernameInputValue = this.loginForm.get('username')?.value;
    const passwordInputValue = this.loginForm.get('password')?.value;
    if (usernameInputValue && passwordInputValue) {
      this.service.login(usernameInputValue, passwordInputValue);
    }
  }
}
