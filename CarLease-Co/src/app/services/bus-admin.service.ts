import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import {
  AUTOSUGGESTOR_PATH,
  BASE_URL,
  CAR_PATCH_PATH,
  CAR_PATH,
} from '../constants';
import { ROUTES } from '../enums';
import { AutosuggestorForm, Car, CarPriceForm } from '../types';
import { LocalStorageManagerService } from './local-storage-manager.service';

@Injectable({
  providedIn: 'root',
})
export class BusAdminService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageManagerService);

  getAutosuggestorValues(): Observable<AutosuggestorForm[]> {
    return this.httpClient.get<AutosuggestorForm[]>(
      `${BASE_URL}${AUTOSUGGESTOR_PATH}`,
    );
  }

  getCarPrices(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(`${BASE_URL}${CAR_PATH}`);
  }

  adjustAutosuggestor(
    autosuggestorRanges: AutosuggestorForm,
  ): Observable<unknown> {
    const userHeaders = new HttpHeaders({
      userId: this.localStorageService.storedUser()()!.userId,
      role: this.localStorageService.storedUser()()!.role,
    });
    return this.httpClient
      .put<AutosuggestorForm>(
        `${BASE_URL}${AUTOSUGGESTOR_PATH}`,
        autosuggestorRanges,
        {
          headers: userHeaders,
        },
      )
      .pipe(
        tap((response) => {
          response;
          this.router.navigate([ROUTES.HOME]);
        }),
      );
  }
  adjustCarPrices(car: CarPriceForm): Observable<unknown> {
    const userHeaders = new HttpHeaders({
      userId: this.localStorageService.storedUser()()!.userId,
      role: this.localStorageService.storedUser()()!.role,
    });
    return this.httpClient
      .patch<Car>(`${BASE_URL}${CAR_PATCH_PATH}`, car, {
        headers: userHeaders,
      })
      .pipe(
        tap((response) => {
          response;
          this.router.navigate([ROUTES.HOME]);
        }),
      );
  }
}
