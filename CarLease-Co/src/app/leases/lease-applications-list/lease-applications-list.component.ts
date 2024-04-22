import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { LeaseApplication } from '../../types';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApplicationListService } from '../../services/application-list.service';
import { Router } from '@angular/router';
import { userInfo } from 'os';
import { LoginService } from '../../services/login.service';

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
  leaseApplications: LeaseApplication[] = [];
  displayedColumns: string[] = [
    'applicationId',
    'applicationDate',
    'loanAmount',
    'loanDuration',
    'isSubmitted',
    'status',
  ];

  role: any;
  userId: any;
  drafted: string = 'drafted';
  submitted: string = 'submitted';
  private readonly router = inject(Router);
  loginService = inject(LoginService);

  dataSource: MatTableDataSource<LeaseApplication> =
    new MatTableDataSource<LeaseApplication>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private applicationsService: ApplicationListService) {}
  ngOnInit(): void {
    role = this.loginService.loginResponse$.role;
    userId = this.loginService.loginResponse$.userId;
    console.log(this.role);
    console.log(this.userId);
    this.applicationsService.applications$.subscribe((applications) => {
      // if (this.role === 'APPLICANT') {
      //   this.dataSource.data = applications.filter(
      //     (application) => application.user.id === +this.userId!
      //   );
      //   this.leaseApplications = applications;
      // } else if (this.role === 'REVIEWER' || this.role === 'APPROVER') {
      //   this.dataSource.data = applications.filter(
      //     (application) => application.submitted === true
      //   );
      //   this.leaseApplications = applications;
      // } else {
      //   this.dataSource.data = applications;
      //   this.leaseApplications = applications;
      // }
      this.dataSource.data = applications;
      this.leaseApplications = applications;
      console.log('ap', this.leaseApplications);
    });
    this.applicationsService.getApplications();
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
    this.router.navigate(['application-details', selectedApplication?.id]);
  }
}
