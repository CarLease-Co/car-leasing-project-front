import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { LeaseApplication, LeaseApplications } from '../../types';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-lease-applications-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './lease-applications-list.component.html',
  styleUrl: './lease-applications-list.component.scss',
})
export class LeaseApplicationsListComponent implements AfterViewInit {
  testLease: LeaseApplication = {
    id: 123,
    applicantId: 234,
    userName: 'TestName',
    userSurname: 'TestSurname',
    monthlyIncome: 1000,
    financialObligations: 0,
    carBrand: 'Toyota',
    carModel: 'Corolla',
    carYear: 2020,
    loanAmount: 5000,
    loanDuration: 12,
    freeTextDesc: 'Test essay',
    isSubmitted: false,
  };
  testLease2: LeaseApplication = {
    id: 987,
    applicantId: 890,
    userName: 'TestName2',
    userSurname: 'TestSurname2',
    monthlyIncome: 2000,
    financialObligations: 1,
    carBrand: 'Toyota',
    carModel: 'Corolla',
    carYear: 2020,
    loanAmount: 10000,
    loanDuration: 24,
    freeTextDesc: 'Test essay',
    isSubmitted: true,
  };

  leases: LeaseApplications = [this.testLease, this.testLease2];
  submitted: string = 'Submitted';
  drafted: string = 'Drafted';
  displayedColumns: string[] = [
    'id',
    'applicantId',
    'monthlyIncome',
    'loanAmount',
    'carBrand',
    'carModel',
    'carYear',
    'loanDuration',
    'isSubmitted',
  ];
  dataSource: MatTableDataSource<LeaseApplication>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.leases);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onApplication(): void {
    console.log(this.leases);
  }
}
