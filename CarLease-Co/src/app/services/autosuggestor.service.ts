import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { APPLICATIONS_PATH, AUTOSUGGESTION, BASE_URL } from '../constants';
import { Autosuggestion } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AutosuggestorService {
  private readonly httpClient = inject(HttpClient);
  private autosuggestorSubject: BehaviorSubject<Autosuggestion | null> =
    new BehaviorSubject<Autosuggestion | null>(null);
  public autosuggestion$ = this.autosuggestorSubject.asObservable();

  getAutosuggestedValue(applicationId: number) {
    this.httpClient
      .get<Autosuggestion>(
        `${BASE_URL}${APPLICATIONS_PATH}/${applicationId}${AUTOSUGGESTION}`,
      )
      .pipe(tap((suggestion) => this.autosuggestorSubject.next(suggestion)))
      .subscribe();
  }
}
