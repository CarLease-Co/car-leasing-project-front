import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EMPTY, Observable, catchError } from 'rxjs';
import { DISPLAY_OPTIONS, EMPLOYEE_ROLE, ERROR_MESSAGES } from '../../enums';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
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
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  private readonly userService = inject(UserService);
  newUserForm = inject(NonNullableFormBuilder).group({
    username: ['', [Validators.required, Validators.min(3)]],
    password: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.min(3)]],
    surname: ['', [Validators.required, Validators.min(3)]],
    role: ['', [Validators.required]],
  });
  ERROR_MESSAGES = ERROR_MESSAGES;
  EMPLOYEE_ROLE = EMPLOYEE_ROLE;
  DISPLAY_OPTIONS = DISPLAY_OPTIONS;
  unauthorized: boolean = false;
  displayNewUserForm: boolean = false;

  userForm(): void {
    this.displayNewUserForm = !this.displayNewUserForm;
  }
  createUser(): void {
    if (this.newUserForm.valid) {
      this.userService
        .createUser(this.newUserForm.getRawValue())
        .pipe(catchError(this.handleError))
        .subscribe();

      this.newUserForm.reset();
      this.displayNewUserForm = !this.displayNewUserForm;
    }
  }

  private handleError = (error: HttpErrorResponse): Observable<never> => {
    if (error) {
      this.unauthorized = true;
      this.newUserForm.reset();
    }
    return EMPTY;
  };
}
