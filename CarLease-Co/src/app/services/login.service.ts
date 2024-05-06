import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { BASE_URL, LOGIN_PATH } from '../constants';
import { EMPLOYEE_ROLE, ROUTES } from '../enums';
import { LoginBody, LoginResponse } from '../types';
import { LocalStorageManagerService } from './local-storage-manager.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageManagerService);

  login(username: string, password: string): Observable<LoginResponse> {

    const loginBody: LoginBody = { username, password };
    return this.httpClient
      .post<LoginResponse>(`${BASE_URL}${LOGIN_PATH}`, loginBody)
      .pipe(
        tap(this.localStorageService.setUser),
        tap(() => {
          const user = this.localStorageService.getStoredUser();
          if (user?.role === EMPLOYEE_ROLE.SYSTEM_ADMIN) {
            this.router.navigate([ROUTES.SYS_ADMIN_VIEW])
          } else {
            this.router.navigate([ROUTES.HOME])

          }
        }),
      );
  }
}
