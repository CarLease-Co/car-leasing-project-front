import { Component, ViewChild, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ROUTES } from '../../enums';
import { SpinnerComponent } from '../../layout/spinner/spinner.component';
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
    SpinnerComponent,
  ],
  templateUrl: './lease-applications-list.component.html',
  styleUrl: './lease-applications-list.component.scss',
})
export class LeaseApplicationsListComponent {
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

  isLoading = true;

  dataSource: MatTableDataSource<LeaseApplication> =
    new MatTableDataSource<LeaseApplication>();
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  ngOnInit(): void {
    const loginResponse = this.localStorageService.storedUser();
    this.role = loginResponse()!.role;
    this.userId = loginResponse()!.userId;
    this.applicationsService
      .getApplications()
      .pipe(
        tap((applications) => {
          this.dataSource.data = applications;
          this.leaseApplications = applications;
          this.isLoading = false;
        }),
      )
      .subscribe();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onApplication(id: number): void {
    const selectedApplication = this.leaseApplications.find(
      (application) => application.id === id,
    );
    this.router.navigate([ROUTES.APPLICATION_DETAILS, selectedApplication?.id]);
  }
}
