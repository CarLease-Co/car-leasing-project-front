import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject, share } from 'rxjs';
import { LOGIN_RESPONSE_KEY } from '../constants';
import { LoginResponse } from '../types';

function checkIfWindowExists(): boolean {
  if (window !== undefined && window.localStorage !== undefined) return true;
  return false;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageManagerService {
  setUser(value: LoginResponse): void {
    // if (window && window.localStorage) {
    localStorage.setItem(LOGIN_RESPONSE_KEY, JSON.stringify(value));
    // }
  }
  getStoredUser(): LoginResponse | undefined {
    if (
      typeof localStorage === 'undefined' ||
      !localStorage.getItem(LOGIN_RESPONSE_KEY)
    ) {
      return undefined;
    }
    return JSON.parse(localStorage.getItem(LOGIN_RESPONSE_KEY) as string);
  }

  // private onSubject = new Subject<{ key: string; value: any }>();
  // public changes = this.onSubject.asObservable().pipe(share());

  // ngOnDestroy() {
  //   this.stop();
  // }

  // getStorage(key: string): any | null {
  //   let s = [];
  //   if (checkIfWindowExists()) {
  //     s.push({
  //       key: key,
  //       value: JSON.parse(localStorage.getItem(key)!),
  //     });

  //     return s;
  //   }
  // }
  // store(key: string, value: string) {
  //   if (checkIfWindowExists()) {
  //     localStorage.setItem(key, value);
  //     this.onSubject.next({ key: key, value: value });
  //   }
  // }

  // clear(key: string) {
  //   if (checkIfWindowExists()) {
  //     localStorage.removeItem(key);
  //     this.onSubject.next({ key: key, value: null });
  //   }
  // }
  // private start(): void {
  //   if (checkIfWindowExists()) {
  //     window.addEventListener('storage', this.storageEventListener);
  //   }
  // }

  // private storageEventListener = (event: StorageEvent) => {
  //   if (checkIfWindowExists()) {
  //     if (event.storageArea == localStorage) {
  //       let v;
  //       try {
  //         if (event.newValue) {
  //           v = JSON.parse(event.newValue);
  //         }
  //       } catch (e) {
  //         v = event.newValue;
  //       }
  //       this.onSubject.next({ key: event.key!, value: v });
  //     }
  //   }
  // };

  // private stop(): void {
  //   if (checkIfWindowExists()) {
  //     window.removeEventListener(
  //       'storage',
  //       this.storageEventListener.bind(this)
  //     );
  //     this.onSubject.complete();
  //   }
  // }
}
