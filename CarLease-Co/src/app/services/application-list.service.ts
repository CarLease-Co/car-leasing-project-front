import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { LeaseApplication, LeaseApplications } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ApplicationListService {
  private readonly httpClient = inject(HttpClient);
  private applicationsSubject = new BehaviorSubject<LeaseApplication[]>([]);
  applications$ = this.applicationsSubject.asObservable();
  application$ = new BehaviorSubject<LeaseApplication | null>(null);
  getApplications(): void {
    this.httpClient
      .get<LeaseApplications>(
        'localhost:8080/api/v1/applications'
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
        `localhost:8080/api/v1/applications/${id}`
      )
      .pipe(
        tap(console.log),
        tap((application) => this.application$.next(application))
      )
      .subscribe();
  }
}
