import { Routes } from '@angular/router';
import { LeaseApplicationsListComponent } from './leases/lease-applications-list/lease-applications-list.component';
import { LeaseDetailsComponent } from './leases/lease-details/lease-details.component';
import { LeaseApplicationFormComponent } from './leases/lease-application-form/lease-application-form.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { loginAccessGuard } from './guards/login-access.guard';

export const routes: Routes = [
  {
    path: 'applications',
    component: LeaseApplicationsListComponent,
    canActivate: [loginAccessGuard],
  },
  {
    path: 'applications/details/:id',
    component: LeaseDetailsComponent,
    canActivate: [loginAccessGuard],
  },
  {
    path: 'new-application',
    component: LeaseApplicationFormComponent,
    canActivate: [loginAccessGuard],
  },
  { path: 'login', component: LoginFormComponent },
];
