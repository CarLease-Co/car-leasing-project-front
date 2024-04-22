import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { LeaseApplication } from '../../types';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApplicationListService } from '../../services/application-list.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MatIconModule } from '@angular/material/icon';

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
  leaseApplications: LeaseApplication[] = [];
  displayedColumns: string[] = [
    'id',
    'applicationDate',
    'loanAmount',
    'loanDuration',
    'status',
  ];

  role!: string | null;
  userId!: number | null;
  private readonly router = inject(Router);
  loginService = inject(LoginService);

  dataSource: MatTableDataSource<LeaseApplication> =
    new MatTableDataSource<LeaseApplication>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private applicationsService: ApplicationListService) {}
  ngOnInit(): void {
    const loginResponse = JSON.parse(localStorage.getItem('loginResponse')!);
    this.role = loginResponse.role;
    this.userId = loginResponse.userId;
    this.applicationsService.getApplications();
    this.applicationsService.applications$.subscribe((applications) => {
      if (this.role === 'APPLICANT') {
        this.dataSource.data = applications.filter(
          (application) => application.user.userId === +this.userId!
        );
        this.leaseApplications = applications;
      } else if (this.role === 'REVIEWER' || this.role === 'APPROVER') {
        this.dataSource.data = applications.filter(
          (application) => application.status !== 'DRAFT'
        );
        this.leaseApplications = applications;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onApplication(id: number): void {
    const selectedApplication = this.leaseApplications.find(
      (application) => application.id === id
    );
    this.router.navigate([
      'applications/application-details',
      selectedApplication?.id,
    ]);
  }
}
