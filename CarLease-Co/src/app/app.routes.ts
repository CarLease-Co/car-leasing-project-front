import { Routes } from '@angular/router';
import { LeaseApplicationsListComponent } from './leases/lease-applications-list/lease-applications-list.component';
import { LeaseApplicationFormComponent } from './leases/lease-application-form/lease-application-form.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: 'applications', component: LeaseApplicationsListComponent },
  { path: 'new-application', component: LeaseApplicationFormComponent },
];
