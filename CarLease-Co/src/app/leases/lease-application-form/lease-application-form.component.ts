import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-lease-application-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatOption,
    MatSelectModule,
    MatSliderModule,
  ],
  templateUrl: './lease-application-form.component.html',
  styleUrl: './lease-application-form.component.scss',
})
export class LeaseApplicationFormComponent {}
