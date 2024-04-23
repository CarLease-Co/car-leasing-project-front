import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { LoginResponse } from '../types';
import { LocalStorageManagerService } from './local-storage-manager.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageManagerService);

  login(username: string, password: string): void {
    this.httpClient
      .get<LoginResponse>(
        'https://car-leasing-project-back-sandbox.onrender.com/api/v1/users/login',
        { params: { username, password } }
      )
      .pipe(
        tap(this.localStorageService.setUser),
        tap(() => this.router.navigate(['']))
      )
      .subscribe();
  }
}
