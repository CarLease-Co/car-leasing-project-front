import { Routes } from '@angular/router';
import { LeaseApplicationsListComponent } from './leases/lease-applications-list/lease-applications-list.component';
import { LeaseDetailsComponent } from './leases/lease-details/lease-details.component';
import { LeaseApplicationFormComponent } from './leases/lease-application-form/lease-application-form.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { loginAccessGuard } from './guards/login-access.guard';
import { ViewComponent } from './sysadmin-view/view/view.component';
import { AppComponent } from './app.component';
import { AutosuggestorFormComponent } from './business-admin-view/autosuggestor-form/autosuggestor-form.component';
import { sysadminLoginGuard } from './guards/sysadmin-login.guard';
import { busadminLoginGuard } from './guards/busadmin-login.guard';

export const routes: Routes = [
  { path: '', component: AppComponent, canActivate: [loginAccessGuard] },
  {
    path: 'applications',
    component: LeaseApplicationsListComponent,
    canActivate: [loginAccessGuard],
  },
  {
    path: 'applications/application-details/:id',
    component: LeaseDetailsComponent,
    canActivate: [loginAccessGuard],
  },
  {
    path: 'new-application',
    component: LeaseApplicationFormComponent,
    canActivate: [loginAccessGuard],
  },
  { path: 'login', component: LoginFormComponent },
  {
    path: 'sysadmin-view',
    component: ViewComponent,
    canActivate: [sysadminLoginGuard],
  },

  {
    path: 'autosuggestor-form',
    component: AutosuggestorFormComponent,
    canActivate: [busadminLoginGuard],
  },
];
