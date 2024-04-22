import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { LoginResponse, User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly httpClient = inject(HttpClient);
  loginResponse$ = new BehaviorSubject<LoginResponse | null>(null);
  login(username: string, password: string): void {
    this.httpClient
      .post<LoginResponse>(
        'https://car-leasing-project-back-sandbox.onrender.com/api/v1/users',
        { username, password }
      )
      .pipe(
        tap((response) => this.loginResponse$.next(response)),
        tap(console.log)
      )
      .subscribe();
  }
}
