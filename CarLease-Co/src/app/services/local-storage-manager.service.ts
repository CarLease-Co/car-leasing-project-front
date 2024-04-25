import { Injectable, signal } from '@angular/core';
import { LOGIN_RESPONSE_KEY } from '../constants';
import { LoginResponse } from '../types';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageManagerService {
  private readonly _storedUser = signal<LoginResponse | undefined>(undefined);
  readonly storedUser = this._storedUser.asReadonly;

  setUser(value: LoginResponse): void {
    localStorage.setItem(LOGIN_RESPONSE_KEY, JSON.stringify(value));
  }
  getStoredUser(): LoginResponse | undefined {
    if (
      typeof localStorage === 'undefined' ||
      !localStorage.getItem(LOGIN_RESPONSE_KEY)
    ) {
      return undefined;
    }
    const parsedUser = JSON.parse(
      localStorage.getItem(LOGIN_RESPONSE_KEY) as string
    );
    this._storedUser.set(parsedUser);
    return parsedUser;
  }
  logout(): void {
    localStorage.clear();
    this._storedUser.set(undefined);
  }
}
