import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { AutosuggestorComponent } from '../autosuggestor/autosuggestor.component';

@Component({
  selector: 'app-approve-application-view',
  standalone: true,
  imports: [MatRadioModule,
    MatButtonModule,
    AutosuggestorComponent],
  templateUrl: './approve-application-view.component.html',
  styleUrl: './approve-application-view.component.scss'
})
export class ApproveApplicationViewComponent {
  selectedValue: string = '';

  submitForm() {
    console.log('Selected Value:', this.selectedValue);
  }
}
