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
  selector: 'app-lease-application-form',
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
  templateUrl: './lease-application-form.component.html',
  styleUrls: ['./lease-application-form.component.scss'],
})
export class LeaseApplicationFormComponent {
  leaseForm = new FormGroup({
    monthlyIncome: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
    monthlyObligations: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
    carMake: new FormControl('', Validators.required),
    carModel: new FormControl('', Validators.required),
    carYear: new FormControl(1925, [
      Validators.required,
      Validators.min(1925),
      Validators.max(2024),
    ]),
    duration: new FormControl(3, [
      Validators.required,
      Validators.min(3),
      Validators.max(68),
    ]),
    leasingAmount: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
    explanation: new FormControl(''),
  });

  onSubmit() {
    console.log('Form submitted:', this.leaseForm.value);
  }
}
