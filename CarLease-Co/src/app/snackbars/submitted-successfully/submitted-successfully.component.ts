import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-submitted-successfully',
  standalone: true,
  imports: [],
  templateUrl: './submitted-successfully.component.html',
  styleUrl: './submitted-successfully.component.scss',
})
export class SubmittedSuccessfullyComponent {
  snackBarRef = inject(MatSnackBarRef);
}
