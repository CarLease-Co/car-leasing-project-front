import { Component } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [UserListComponent, UserFormComponent],
  templateUrl: './sys-admin-view.component.html',
  styleUrl: './sys-admin-view.component.scss',
})
export class SysAdminViewComponent {}
