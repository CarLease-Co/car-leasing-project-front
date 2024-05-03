import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AUTOSUGGESTOR_PATH, BASE_URL, CAR_PATCH_PATH } from '../constants';
import { ROUTES } from '../enums';
import { AutosuggestorForm, Car, CarPriceForm, LoginResponse } from '../types';
import { LocalStorageManagerService } from './local-storage-manager.service';

@Injectable({
  providedIn: 'root',
})
export class BusAdminService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageManagerService);

  readonly userHeaders = new HttpHeaders({
    userId: this.getCurrentUser().userId,
    role: this.getCurrentUser().role,
  });
  adjustAutosuggestor(
    autosuggestorRanges: AutosuggestorForm,
  ): Observable<unknown> {
    return this.httpClient
      .put<AutosuggestorForm>(
        `${BASE_URL}${AUTOSUGGESTOR_PATH}`,
        autosuggestorRanges,
        {
          headers: this.userHeaders,
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
    return this.httpClient.patch<Car>(`${BASE_URL}${CAR_PATCH_PATH}`, car).pipe(
      tap((response) => {
        response;
        this.router.navigate([ROUTES.HOME]);
      }),
    );
  }

  getCurrentUser(): LoginResponse {
    return this.localStorageService.getStoredUser()!;
  }
}
