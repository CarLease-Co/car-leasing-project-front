import { Routes } from '@angular/router';
import { LeaseApplicationsListComponent } from './leases/lease-applications-list/lease-applications-list.component';
import { LeaseDetailsComponent } from './leases/lease-details/lease-details.component';
import { LeaseApplicationFormComponent } from './leases/lease-application-form/lease-application-form.component';
import { ViewComponent } from './sysadmin-view/view/view.component';
import { AppComponent } from './app.component';
import { AutosuggestorFormComponent } from './business-admin-view/autosuggestor-form/autosuggestor-form.component';

export const routes: Routes = [
  { path: 'applications', component: LeaseApplicationsListComponent },
  { path: 'application-details/:id', component: LeaseDetailsComponent },
  { path: 'new-application', component: LeaseApplicationFormComponent },
  { path: 'sysadmin-view', component: ViewComponent },
  { path: 'autosuggestor-form', component: AutosuggestorFormComponent },
];
