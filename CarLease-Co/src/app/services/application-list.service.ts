import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { APPLICATIONS_PATH, BASE_URL, CAR_PATH } from '../constants';
import { ROUTES } from '../enums';
import {
  Car,
  LeaseApplication,
  LeaseApplicationForm,
  LeaseApplications,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class ApplicationListService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private applicationsSubject = new BehaviorSubject<LeaseApplication[]>([]);
  cars$ = new BehaviorSubject<Car[]>([]);
  applications$ = this.applicationsSubject.asObservable();
  application$ = new BehaviorSubject<LeaseApplication | null>(null);
  getApplications(userId: number, role: string): void {
    const headers = new HttpHeaders({
      'userId': userId,
      'role': role
    })
    console.log(headers);

    this.httpClient
      .get<LeaseApplications>(`${BASE_URL}${APPLICATIONS_PATH}`, { headers: headers })
      .pipe(tap((applications) => this.applicationsSubject.next(applications)))
      .subscribe();
  }
  getApplicationById(id: number): void {
    this.httpClient
      .get<LeaseApplication>(`${BASE_URL}${APPLICATIONS_PATH}/${id}`)
      .pipe(tap((application) => this.application$.next(application)))
      .subscribe();
  }
  getCars(): void {
    this.httpClient
      .get<Car[]>(`${BASE_URL}${CAR_PATH}`)
      .pipe(tap((cars) => this.cars$.next(cars)))
      .subscribe();
  }
  createApplication(application: LeaseApplicationForm): Observable<unknown> {
    return this.httpClient
      .post(`${BASE_URL}${APPLICATIONS_PATH}`, application)
      .pipe(
        tap((response) => {
          response;
          this.router.navigate([ROUTES.APPLICATIONS]);
        }),
      );
  }
}
