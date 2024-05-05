import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AutosuggestorFormComponent } from './business-admin-view/autosuggestor-form/autosuggestor-form.component';
import { CarPriceModifierComponent } from './business-admin-view/car-price-modifier/car-price-modifier.component';
import { BREADCRUMBS, ROUTES } from './enums';
import { busAdminLoginGuard } from './guards/busadmin-login.guard';
import { loginAccessGuard } from './guards/login-access.guard';
import { sysAdminLoginGuard } from './guards/sysadmin-login.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { EditDetailsComponent } from './leases/edit-details/edit-details.component';
import { LeaseApplicationFormComponent } from './leases/lease-application-form/lease-application-form.component';
import { LeaseApplicationsListComponent } from './leases/lease-applications-list/lease-applications-list.component';
import { LeaseDetailsComponent } from './leases/lease-details/lease-details.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { SysAdminViewComponent } from './sys-admin-view/sys-admin-view/sys-admin-view.component';

export const routes: Routes = [
  {
    path: ROUTES.LANDING,
    component: AppComponent,
    canActivate: [loginAccessGuard],
  },
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
    data: { breadcrumb: BREADCRUMBS.AUTOSUGGESTOR_FORM },
  },
  {
    path: ROUTES.CAR_PRICE_MODIFIER,
    component: CarPriceModifierComponent,
    canActivate: [busAdminLoginGuard],
    data: { breadcrumb: BREADCRUMBS.CAR_PRICE_MODIFIER },
  },
  {
    path: ROUTES.APPLICATIONS,
    canActivate: [loginAccessGuard],
    data: { breadcrumb: BREADCRUMBS.APPLICATIONS },
    children: [
      {
        path: '',
        component: LeaseApplicationsListComponent,
        data: { breadcrumb: undefined },
      },
      {
        path: ROUTES.APPLICATION_DETAILS_ID,
        component: LeaseDetailsComponent,
        canActivate: [loginAccessGuard],
        data: { breadcrumb: BREADCRUMBS.APPLICATIONS_DETAILS },
      },
      {
        path: ROUTES.EDIT_APPLICATION_ID,
        component: EditDetailsComponent,
        canActivate: [loginAccessGuard],
        data: { breadcrumb: BREADCRUMBS.EDIT_APPLICATION },
      },
    ],
  },
  {
    path: ROUTES.NEW_APPLICATION,
    component: LeaseApplicationFormComponent,
    canActivate: [loginAccessGuard],
    data: { breadcrumb: BREADCRUMBS.NEW_APPLICATION },
  },
];
