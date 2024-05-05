import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reviewed-successfully',
  standalone: true,
  imports: [],
  templateUrl: './reviewed-successfully.component.html',
  styleUrl: './reviewed-successfully.component.scss',
})
export class ReviewedSuccessfullyComponent {
  snackBarRef = inject(MatSnackBarRef);
}
