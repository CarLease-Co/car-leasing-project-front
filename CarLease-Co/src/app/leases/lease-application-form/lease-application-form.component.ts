import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ApplicationListService } from '../../services/application-list.service';
import { tap } from 'rxjs';

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
    carModel: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    carYear: new FormControl(1994, [
      Validators.required,
      Validators.min(1994),
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
  private readonly router = inject(Router);
  readonly service = inject(ApplicationListService);
  get makeControl(): AbstractControl<string | null, string | null> | null {
    return this.leaseForm.get('carMake');
  }
  get modelControl(): AbstractControl<string | null, string | null> | null {
    return this.leaseForm.get('carModel');
  }

  ngOnInit(): void {
    this.service.getCars();
    this.makeControl?.valueChanges
      .pipe(
        tap((make) => {
          make ? this.modelControl?.enable() : this.modelControl?.disable();
        })
      )
      .subscribe();
  }

  onSubmit() {
    console.log('Form submitted:', this.leaseForm.value);
  }
}
