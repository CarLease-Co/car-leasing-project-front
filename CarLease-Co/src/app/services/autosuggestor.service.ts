import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { AUTOSUGGESTOR_VALUES } from "../enums";
import { APPLICATIONS_PATH, AUTOSUGGESTOR_PATH, BASE_URL } from "../constants";
import { Autosuggestion } from '../types';

@Injectable({
    providedIn: 'root'
})
export class AutosuggestorService {
    private readonly httpClient = inject(HttpClient);
    private autosuggestorSubject: BehaviorSubject<Autosuggestion | null> = new BehaviorSubject<Autosuggestion | null>(null);
    public autosuggestion$ = this.autosuggestorSubject.asObservable();

    getAutosuggestedValue(applicationId: number) {
        this.httpClient
            .get<Autosuggestion>(`${BASE_URL}${APPLICATIONS_PATH}/${applicationId}/autosuggestion`)
            .subscribe((suggestion) => this.autosuggestorSubject.next(suggestion));
    }
}
