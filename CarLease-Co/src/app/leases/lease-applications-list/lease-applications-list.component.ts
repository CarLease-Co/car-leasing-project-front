import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { APPLICATION_STATUS, EMPLOYEE_ROLE, ROUTES } from '../../enums';
import { ApplicationListService } from '../../services/application-list.service';
import { LocalStorageManagerService } from '../../services/local-storage-manager.service';
import { LeaseApplication } from '../../types';

@Component({
  selector: 'app-lease-applications-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './lease-applications-list.component.html',
  styleUrl: './lease-applications-list.component.scss',
})
export class LeaseApplicationsListComponent implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageManagerService);
  private readonly applicationsService = inject(ApplicationListService);

  leaseApplications: LeaseApplication[] = [];
  displayedColumns: string[] = [
    'id',
    'applicationDate',
    'loanAmount',
    'loanDuration',
    'status',
  ];

  role?: string;
  userId?: number;

  dataSource: MatTableDataSource<LeaseApplication> =
    new MatTableDataSource<LeaseApplication>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    const loginResponse = this.localStorageService.getStoredUser();
    this.role = loginResponse?.role;
    this.userId = loginResponse?.userId;
    this.applicationsService.getApplications(this.userId!, this.role!);
    this.applicationsService.applications$
      .pipe(
        tap((applications) => this.filterApplications(applications)),
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterApplications(applications: LeaseApplication[]): void {
    if (this.role === EMPLOYEE_ROLE.APPLICANT) {

      this.dataSource.data = applications.filter(
        (application) => application.userId === +this.userId!
      );
      this.leaseApplications = applications;
    } else if (
      this.role === EMPLOYEE_ROLE.REVIEWER ||
      this.role === EMPLOYEE_ROLE.APPROVER
    ) {
      this.dataSource.data = applications.filter(
        (application) => application.status !== APPLICATION_STATUS.DRAFT
      );
      this.leaseApplications = applications;
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onApplication(id: number): void {
    const selectedApplication = this.leaseApplications.find(
      (application) => application.id === id
    );
    this.router.navigate([ROUTES.APPLICATION_DETAILS, selectedApplication?.id]);
  }
}
