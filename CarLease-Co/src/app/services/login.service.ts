import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LoginResponse } from '../types';
import { LocalStorageManagerService } from './local-storage-manager.service';
import { Router } from '@angular/router';
import { ROUTES } from '../enums';
import { BASE_URL, ErrorMessages, LOGIN_PATH } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageManagerService);

  login(username: string, password: string): Observable<LoginResponse> {
    return this.httpClient
      .get<LoginResponse>(`${BASE_URL}${LOGIN_PATH}`, {
        params: { username, password },
      })
      .pipe(
        tap(this.localStorageService.setUser),
        tap(() => this.router.navigate([ROUTES.HOME])),
      );
  }
}
