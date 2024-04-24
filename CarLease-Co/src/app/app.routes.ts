import { Routes } from '@angular/router';
import { LeaseApplicationsListComponent } from './leases/lease-applications-list/lease-applications-list.component';
import { LeaseDetailsComponent } from './leases/lease-details/lease-details.component';
import { LeaseApplicationFormComponent } from './leases/lease-application-form/lease-application-form.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { loginAccessGuard } from './guards/login-access.guard';
import { ViewComponent } from './sysadmin-view/view/view.component';
import { AppComponent } from './app.component';
import { AutosuggestorFormComponent } from './business-admin-view/autosuggestor-form/autosuggestor-form.component';
import { sysAdminLoginGuard } from './guards/sysadmin-login.guard';
import { busadminLoginGuard } from './guards/busadmin-login.guard';
import { ROUTES } from './enums';

export const routes: Routes = [
  {
    path: ROUTES.HOME,
    component: AppComponent,
    canActivate: [loginAccessGuard],
  },
  { path: 'login', component: LoginFormComponent },
  {
    path: ROUTES.SYSADMIN_VIEW,
    component: ViewComponent,
    canActivate: [sysAdminLoginGuard],
  },

  {
    path: ROUTES.AUTOSUGGESTOR_FORM,
    component: AutosuggestorFormComponent,
    canActivate: [busadminLoginGuard],
  },
  {
    path: ROUTES.APPLICATIONS,
    component: LeaseApplicationsListComponent,
    canActivate: [loginAccessGuard],
  },
  {
    path: ROUTES.APPLICATION_DETAILS_BY_ID,
    component: LeaseDetailsComponent,
    canActivate: [loginAccessGuard],
  },
  {
    path: ROUTES.NEW_APPLICATION,
    component: LeaseApplicationFormComponent,
    canActivate: [loginAccessGuard],
  },
];
