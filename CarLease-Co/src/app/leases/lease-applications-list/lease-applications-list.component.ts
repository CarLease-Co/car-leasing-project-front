import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { LeaseApplication } from '../../types';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApplicationListService } from '../../services/application-list.service';
import { Router } from '@angular/router';

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
    'id',
    'applicationDate',
    'loanAmount',
    'loanDuration',
    'isSubmitted',
    'status',
  ];
  dataSource: MatTableDataSource<LeaseApplication> =
    new MatTableDataSource<LeaseApplication>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private readonly router = inject(Router);

  constructor(private applicationsService: ApplicationListService) {}
  ngOnInit(): void {
    this.applicationsService.applications$.subscribe((applications) => {
      this.dataSource.data = applications;
      this.leaseApplications = applications;
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
