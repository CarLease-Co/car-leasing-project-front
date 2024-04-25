import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL, USER_PATH} from "../constants";
import {BehaviorSubject, tap} from "rxjs";
import {User} from "../types";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly httpClient = inject(HttpClient);
  private userSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public users$ = this.userSubject.asObservable();

  getUsers() {
    this.httpClient
      .get<User[]>(`${BASE_URL}/${USER_PATH}`)
      .pipe(tap((users) => this.userSubject.next(users)))
      .subscribe();
  }
}
