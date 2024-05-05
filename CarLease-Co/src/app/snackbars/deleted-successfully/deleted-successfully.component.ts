import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-saved-successfully',
  standalone: true,
  imports: [],
  templateUrl: './deleted-successfully.component.html',
  styleUrl: './deleted-successfully.component.scss',
})
export class DeletedSuccessfullyComponent {
  snackBarRef = inject(MatSnackBarRef);
}
