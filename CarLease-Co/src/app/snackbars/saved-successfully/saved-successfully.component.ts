import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-deleted-successfully',
  standalone: true,
  imports: [],
  templateUrl: './saved-successfully.component.html',
  styleUrl: './saved-successfully.component.scss',
})
export class SavedSuccessfullyComponent {
  snackBarRef = inject(MatSnackBarRef);
}
