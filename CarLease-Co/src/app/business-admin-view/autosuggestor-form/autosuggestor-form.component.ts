import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-autosuggestor-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatSliderModule,
    MatButtonModule,
  ],
  templateUrl: './autosuggestor-form.component.html',
  styleUrl: './autosuggestor-form.component.scss',
})
export class AutosuggestorFormComponent {
  autosuggestorForm = new FormGroup({
    monthlyExpenses: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
    interestPercentage: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(100),
    ]),
    minCarPriceRange: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
    maxCarPriceRange: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
    minCarYear: new FormControl(1994, [
      Validators.required,
      Validators.min(1994),
      Validators.max(2024),
    ]),
    maxCarYear: new FormControl(2024, [
      Validators.required,
      Validators.min(1994),
      Validators.max(2024),
    ]),
  });
  onSubmit() {
    console.log(this.autosuggestorForm.value);
    this.autosuggestorForm.reset();
  }
}
