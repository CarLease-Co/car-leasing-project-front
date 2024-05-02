import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { AutosuggestorComponent } from "../autosuggestor/autosuggestor.component";

@Component({
  selector: 'app-review-application-view',
  standalone: true,
  templateUrl: './review-application-view.component.html',
  styleUrl: './review-application-view.component.scss',
  imports: [
    MatRadioModule,
    MatButtonModule,
    AutosuggestorComponent
  ]
})
export class ReviewApplicationViewComponent {

  selectedValue: string = '';


  submitForm() {
    console.log('Selected Value:', this.selectedValue);
  }

}
