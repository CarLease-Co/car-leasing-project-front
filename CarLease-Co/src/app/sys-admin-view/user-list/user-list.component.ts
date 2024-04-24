import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { employeeList } from '../../mock-data/Employees';
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
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Employee } from '../../types';
import { MatPaginator } from '@angular/material/paginator';

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
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements AfterViewInit {
  dataSource = new MatTableDataSource(employeeList);
  displayedColumns: string[] = [
    'userId',
    'fullName',
    'role',
    'email',
    'password',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _liveAnnouncer: LiveAnnouncer) {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data, filter) => {
      return (
        data.surname.toLowerCase().includes(filter) ||
        data.userId.toString().includes(filter) ||
        data.role.toLowerCase().includes(filter) ||
        data.email.toLowerCase().includes(filter)
      );
    };
    this.dataSource.sortingDataAccessor = (
      item: Employee,
      property: string
    ): string | number => {
      switch (property) {
        case 'fullName':
          return item.surname;
        case 'userId':
          return item.userId;
        case 'role':
          return item.role;
        case 'email':
          return item.email;
        case 'password':
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
