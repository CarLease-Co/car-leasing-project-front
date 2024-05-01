import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BASE_URL, USER_PATH } from '../constants';
import { NewUserForm, User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private userSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    [],
  );
  public users$ = this.userSubject.asObservable();

  getUsers(): void {
    this.httpClient
      .get<User[]>(`${BASE_URL}/${USER_PATH}`)
      .pipe(tap((users) => this.userSubject.next(users)))
      .subscribe();
  }
  createUser(newUser: NewUserForm): Observable<unknown> {
    return this.httpClient
      .post<NewUserForm>(`${BASE_URL}${USER_PATH}`, newUser)
      .pipe(
        tap((response) => {
          response;
          this.getUsers();
        }),
      );
  }
}
