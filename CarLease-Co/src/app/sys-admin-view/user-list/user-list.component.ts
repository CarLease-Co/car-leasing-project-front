import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { USER_PROPERTIES } from '../../enums';
import { SpinnerComponent } from '../../layout/spinner/spinner.component';
import { UserService } from '../../services/user.service';
import { User } from '../../types';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatFormField,
    MatInput,
    MatLabel,
    MatSort,
    MatSortHeader,
    MatNoDataRow,
    MatPaginator,
    SpinnerComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements AfterViewInit {
  private readonly userService: UserService = inject(UserService);

  dataSource: MatTableDataSource<User, MatPaginator> =
    new MatTableDataSource<User>();
  displayedColumns: string[] = [
    USER_PROPERTIES.USER_ID,
    USER_PROPERTIES.FULL_NAME,
    USER_PROPERTIES.ROLE,
    USER_PROPERTIES.EMAIL,
    USER_PROPERTIES.PASSWORD,
  ];
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _liveAnnouncer: LiveAnnouncer) {
    this.userService.users$.subscribe((users) => {
      this.dataSource.data = users;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.userService.getUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data, filter) => {
      return (
        data[USER_PROPERTIES.SURNAME].toLowerCase().includes(filter) ||
        data[USER_PROPERTIES.USER_ID].toString().includes(filter) ||
        data[USER_PROPERTIES.ROLE].toLowerCase().includes(filter) ||
        data[USER_PROPERTIES.EMAIL].toLowerCase().includes(filter)
      );
    };
    this.dataSource.sortingDataAccessor = (
      item: User,
      property: string,
    ): string | number => {
      switch (property) {
        case USER_PROPERTIES.FULL_NAME:
          return item.surname;
        case USER_PROPERTIES.USER_ID:
          return item.userId;
        case USER_PROPERTIES.ROLE:
          return item.role;
        case USER_PROPERTIES.EMAIL:
          return item.email;
        case USER_PROPERTIES.PASSWORD:
          return item.password;
        default:
          return '';
      }
    };
  }

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
