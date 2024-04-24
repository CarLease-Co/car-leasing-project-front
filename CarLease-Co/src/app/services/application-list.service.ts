import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import {
  Car,
  LeaseApplication,
  LeaseApplicationForm,
  LeaseApplications,
} from '../types';
import { Application } from 'express';
import { Router } from '@angular/router';
import { BASE_URL } from '../constants';
import { ROUTES } from '../enums';

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
  getApplications(): void {
    this.httpClient
      .get<LeaseApplications>(`${BASE_URL}/api/v1/applications`)
      .pipe(tap((applications) => this.applicationsSubject.next(applications)))
      .subscribe();
  }
  getApplicationById(id: number): void {
    this.httpClient
      .get<LeaseApplication>(`${BASE_URL}/api/v1/applications/${id}`)
      .pipe(tap((application) => this.application$.next(application)))
      .subscribe();
  }
  getCars(): void {
    this.httpClient
      .get<Car>(`${BASE_URL}/api/v1/cars`)
      .pipe(
        tap(console.log),
        tap((cars) => this.cars$.next(cars))
      )
      .subscribe();
  }
  createApplication(application: LeaseApplicationForm): void {
    this.httpClient
      .post(`${BASE_URL}/api/v1/applications`, application)
      .subscribe({
        next: (response) => {
          this.router.navigate([ROUTES.APPLICATIONS]);
          response;
        },
        error: (error) => console.error('Error:', error),
      });
  }
}
