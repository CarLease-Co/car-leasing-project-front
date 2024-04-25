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
import { AutosuggestorFormConfig } from '../../constants';

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
      Validators.min(AutosuggestorFormConfig.minMonthlyExpenses),
    ]),
    minInterestPercentage: new FormControl('', [
      Validators.required,
      Validators.min(AutosuggestorFormConfig.minInterestPercentage),
      Validators.max(AutosuggestorFormConfig.maxInterestPercentage),
    ]),
    maxInterestPercentage: new FormControl('', [
      Validators.required,
      Validators.min(AutosuggestorFormConfig.minInterestPercentage),
      Validators.max(AutosuggestorFormConfig.maxInterestPercentage),
    ]),
    minCarYear: new FormControl(AutosuggestorFormConfig.minCarYear, [
      Validators.required,
      Validators.min(AutosuggestorFormConfig.minCarYear),
      Validators.max(AutosuggestorFormConfig.maxCarYear),
    ]),
    maxCarYear: new FormControl(AutosuggestorFormConfig.maxCarYear, [
      Validators.required,
      Validators.min(AutosuggestorFormConfig.minCarYear),
      Validators.max(AutosuggestorFormConfig.maxCarYear),
    ]),
  });
  onSubmit() {
    this.autosuggestorForm.reset();
  }
}
