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
import { EMPLOYEE_PROPERTIES } from '../../enums';

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
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource(
    employeeList
  );
  displayedColumns: string[] = [
    EMPLOYEE_PROPERTIES.USER_ID,
    EMPLOYEE_PROPERTIES.FULL_NAME,
    EMPLOYEE_PROPERTIES.ROLE,
    EMPLOYEE_PROPERTIES.EMAIL,
    EMPLOYEE_PROPERTIES.PASSWORD,
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _liveAnnouncer: LiveAnnouncer) {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data, filter) => {
      return (
        data[EMPLOYEE_PROPERTIES.SURNAME].toLowerCase().includes(filter) ||
        data[EMPLOYEE_PROPERTIES.USER_ID].toString().includes(filter) ||
        data[EMPLOYEE_PROPERTIES.ROLE].toLowerCase().includes(filter) ||
        data[EMPLOYEE_PROPERTIES.EMAIL].toLowerCase().includes(filter)
      );
    };
    this.dataSource.sortingDataAccessor = (
      item: Employee,
      property: string
    ): string | number => {
      switch (property) {
        case EMPLOYEE_PROPERTIES.FULL_NAME:
          return item.surname;
        case EMPLOYEE_PROPERTIES.USER_ID:
          return item.userId;
        case EMPLOYEE_PROPERTIES.ROLE:
          return item.role;
        case EMPLOYEE_PROPERTIES.EMAIL:
          return item.email;
        case EMPLOYEE_PROPERTIES.PASSWORD:
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
