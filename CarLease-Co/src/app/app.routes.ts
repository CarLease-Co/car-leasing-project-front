import { Routes } from '@angular/router';
import { AutosuggestorFormComponent } from './business-admin-view/autosuggestor-form/autosuggestor-form.component';
import { CarPriceModifierComponent } from './business-admin-view/car-price-modifier/car-price-modifier.component';
import { ROUTES } from './enums';
import { busAdminLoginGuard } from './guards/busadmin-login.guard';
import { loginAccessGuard } from './guards/login-access.guard';
import { sysAdminLoginGuard } from './guards/sysadmin-login.guard';
import { EditDetailsComponent } from './leases/edit-details/edit-details.component';
import { LeaseApplicationFormComponent } from './leases/lease-application-form/lease-application-form.component';
import { LeaseApplicationsListComponent } from './leases/lease-applications-list/lease-applications-list.component';
import { LeaseDetailsComponent } from './leases/lease-details/lease-details.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { SysAdminViewComponent } from './sys-admin-view/sys-admin-view/sys-admin-view.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  {
    path: ROUTES.HOME,
    component: HomePageComponent,
    canActivate: [loginAccessGuard],
  },
  { path: ROUTES.LOGIN, component: LoginFormComponent },
  {
    path: ROUTES.SYS_ADMIN_VIEW,
    component: SysAdminViewComponent,
    canActivate: [sysAdminLoginGuard],
  },

  {
    path: ROUTES.AUTOSUGGESTOR_FORM,
    component: AutosuggestorFormComponent,
    canActivate: [busAdminLoginGuard],
  },
  {
    path: ROUTES.CAR_PRICE_MODIFIER,
    component: CarPriceModifierComponent,
    canActivate: [busAdminLoginGuard],
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
    path: ROUTES.EDIT_APPLICATION_BY_ID,
    component: EditDetailsComponent,
    canActivate: [loginAccessGuard],
  },
  {
    path: ROUTES.NEW_APPLICATION,
    component: LeaseApplicationFormComponent,
    canActivate: [loginAccessGuard],
  },
];
