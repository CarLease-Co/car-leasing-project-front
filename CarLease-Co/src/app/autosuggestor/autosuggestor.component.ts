import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationListService } from '../services/application-list.service';
import { AutosuggestorService } from '../services/autosuggestor.service';

@Component({
  selector: 'app-autosuggestor',
  standalone: true,
  imports: [],
  templateUrl: './autosuggestor.component.html',
  styleUrl: './autosuggestor.component.scss'
})
export class AutosuggestorComponent {
  private readonly autosuggestorService = inject(AutosuggestorService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly applicationService = inject(ApplicationListService);
  public autosuggestion$ = this.autosuggestorService.autosuggestion$;

  ngOnInit() {
    const applicationId = this.activatedRoute.snapshot.params['id'];
    if (applicationId) {
      this.autosuggestorService.getAutosuggestedValue(applicationId);

      this.autosuggestion$.subscribe(suggestion => {
        console.log('Autosuggestion value: ', suggestion);
      });
    }
  }
}
