// import {inject, Injectable} from '@angular/core';
// import {HttpClient} from "@angular/common/http";
// import {BehaviorSubject} from "rxjs";
// import {AUTOSUGGESTOR_VALUES} from "../enums";
// import {AUTOSUGGESTOR_PATH, BASE_URL} from "../constants";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AutosuggestorService {
//   private readonly httpClient = inject(HttpClient);
//   private autosuggestorSubject: BehaviorSubject<AUTOSUGGESTOR_VALUES> = new BehaviorSubject<AUTOSUGGESTOR_VALUES>("");
//   public autosuggestion$ = this.autosuggestorSubject.asObservable();
//   getAutossugestedValue() {
//     this.httpClient
//       .get<AUTOSUGGESTOR_VALUES>(`${BASE_URL}/${AUTOSUGGESTOR_PATH}`)
//   }
// }
