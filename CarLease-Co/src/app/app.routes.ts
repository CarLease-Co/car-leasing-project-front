import { Routes } from '@angular/router';
import { LeaseApplicationsListComponent } from './leases/lease-applications-list/lease-applications-list.component';
import { LeaseDetailsComponent } from './leases/lease-details/lease-details.component';
import { LeaseApplicationFormComponent } from './leases/lease-application-form/lease-application-form.component';
import { LoginFormComponent } from './login/login-form/login-form.component';

export const routes: Routes = [
  { path: 'applications', component: LeaseApplicationsListComponent },
  { path: 'application-details/:id', component: LeaseDetailsComponent },
  { path: 'new-application', component: LeaseApplicationFormComponent },
  { path: 'login', component: LoginFormComponent },
];
