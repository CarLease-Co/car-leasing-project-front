import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { LoginResponse } from '../types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly httpClient = inject(HttpClient);
  loginResponse$ = new BehaviorSubject<LoginResponse | null>(null);
  login(username: string, password: string): void {
    this.httpClient
      .get<LoginResponse>(
        'https://car-leasing-project-back-sandbox.onrender.com/api/v1/users/login',
        { params: { username, password } }
      )
      .pipe(
        tap((response) =>
          localStorage.setItem('loginResponse', JSON.stringify(response))
        )
      )
      .subscribe();
  }
}
