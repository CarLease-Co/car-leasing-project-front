import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, tap, throwError} from 'rxjs';
import {Car, LeaseApplication, LeaseApplicationForm, LeaseApplications} from '../types';
import {Application} from "express";

@Injectable({
  providedIn: 'root',
})
export class ApplicationListService {
  private readonly httpClient = inject(HttpClient);
  private applicationsSubject = new BehaviorSubject<LeaseApplication[]>([]);
  cars$ = new BehaviorSubject<Car[]>([]);
  applications$ = this.applicationsSubject.asObservable();
  application$ = new BehaviorSubject<LeaseApplication | null>(null);
  getApplications(): void {
    this.httpClient
      .get<LeaseApplications>(
        'https://car-leasing-project-back-sandbox.onrender.com/api/v1/applications'
      )
      .pipe(
        tap(console.log),
        tap((applications) => this.applicationsSubject.next(applications))
      )
      .subscribe();
  }
  getApplicationById(id: number): void {
    this.httpClient
      .get<LeaseApplication>(
        `https://car-leasing-project-back-sandbox.onrender.com/api/v1/applications/${id}`
      )
      .pipe(
        tap(console.log),
        tap((application) => this.application$.next(application))
      )
      .subscribe();
  }
  getCars(): void {
    this.httpClient
      .get<Car>(
        'https://car-leasing-project-back-sandbox.onrender.com/api/v1/cars'
      )
      .pipe(
        tap(console.log),
        tap((cars) => this.cars$.next(cars))
      )
      .subscribe();
  }
  createApplication(application: LeaseApplicationForm): void {

    this.httpClient
      .post('https://car-leasing-project-back-sandbox.onrender.com/api/v1/applications',
        application)
      .subscribe({
        next: (response) => {
        },
        error: (error) => console.error('Error:', error),
      })

  }
}
