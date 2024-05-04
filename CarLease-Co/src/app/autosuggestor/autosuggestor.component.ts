import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ID } from '../constants';
import { AUTOSUGGESTOR_VALUES } from '../enums';
import { AutosuggestorService } from '../services/autosuggestor.service';

@Component({
  selector: 'app-autosuggestor',
  standalone: true,
  imports: [CommonModule, MatBadgeModule],
  templateUrl: './autosuggestor.component.html',
  styleUrl: './autosuggestor.component.scss',
})
export class AutosuggestorComponent {
  private readonly autosuggestorService = inject(AutosuggestorService);
  private readonly activatedRoute = inject(ActivatedRoute);
  public autosuggestion$ = this.autosuggestorService.autosuggestion$;
  public subscription?: Subscription;

  public currentStatus?: string;
  public AUTOSUGGESTOR_VALUES = AUTOSUGGESTOR_VALUES;

  evaluation?: number;
  badgeHidden: boolean = false;

  ngOnInit() {
    const applicationId = this.activatedRoute.snapshot.params[ID];
    if (applicationId) {
      this.autosuggestorService.getAutosuggestedValue(applicationId);
      this.subscription = this.autosuggestion$.subscribe((suggestion) => {
        this.currentStatus = suggestion?.evalStatus;
        this.evaluation = suggestion?.evaluation;
      });
    }
  }

  toggleBadgeVisibility() {
    this.badgeHidden = !this.badgeHidden;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
