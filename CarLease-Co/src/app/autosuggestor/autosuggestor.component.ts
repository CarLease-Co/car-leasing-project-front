import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AUTOSUGGESTOR_VALUES } from '../enums';
import { ApplicationListService } from '../services/application-list.service';
import { AutosuggestorService } from '../services/autosuggestor.service';

@Component({
  selector: 'app-autosuggestor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './autosuggestor.component.html',
  styleUrl: './autosuggestor.component.scss'
})
export class AutosuggestorComponent {
  private readonly autosuggestorService = inject(AutosuggestorService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly applicationService = inject(ApplicationListService);
  public autosuggestion$ = this.autosuggestorService.autosuggestion$;
  public subscription?: Subscription;

  public currentStatus?: string;
  public AUTOSUGGESTOR_VALUES = AUTOSUGGESTOR_VALUES;


  ngOnInit() {
    const applicationId = this.activatedRoute.snapshot.params['id'];
    if (applicationId) {
      this.autosuggestorService.getAutosuggestedValue(applicationId);
      this.subscription = this.autosuggestion$.subscribe(suggestion => {
        this.currentStatus = suggestion?.evalStatus;
        console.log('Autosuggestion value: ', suggestion?.evalStatus);
      });
    }
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
