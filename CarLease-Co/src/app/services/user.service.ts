import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BASE_URL, USER_PATH } from '../constants';
import { LoginResponse, NewUserForm, User } from '../types';
import { LocalStorageManagerService } from './local-storage-manager.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);
  private readonly localStorageService = inject(LocalStorageManagerService);
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    [],
  );
  public users$ = this.usersSubject.asObservable();
  private userSubject: BehaviorSubject<User | undefined> = new BehaviorSubject<
    User | undefined
  >(undefined);
  public user$ = this.usersSubject.asObservable();

  getUsers(): void {
    const userHeaders = new HttpHeaders({
      userId: this.localStorageService.storedUser()()!.userId,
      role: this.localStorageService.storedUser()()!.role,
    });
    this.httpClient
      .get<User[]>(`${BASE_URL}${USER_PATH}`, {
        headers: userHeaders,
      })
      .pipe(tap((users) => this.usersSubject.next(users)))
      .subscribe();
  }
  createUser(newUser: NewUserForm): Observable<unknown> {
    const userHeaders = new HttpHeaders({
      userId: this.localStorageService.storedUser()()!.userId,
      role: this.localStorageService.storedUser()()!.role,
    });
    return this.httpClient
      .post<NewUserForm>(`${BASE_URL}${USER_PATH}`, newUser, {
        headers: userHeaders,
      })
      .pipe(
        tap((response) => {
          response;
          this.getUsers();
        }),
      );
  }
  getUser(userId: number | undefined): Observable<User> {
    return this.httpClient.get<User>(`${BASE_URL}${USER_PATH}/${userId}`).pipe(
      tap((user) => {
        this.userSubject.next(user);
      }),
    );
  }

  getCurrentUser(): LoginResponse {
    return this.localStorageService.getStoredUser()!;
  }
}
