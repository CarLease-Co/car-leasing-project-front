import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPLOYEE_ROLE, ROUTES } from '../enums';
import { environment } from '../environment';
import { UserService } from '../services/user.service';
import { User } from '../types';
import { ApplicationListService } from '../services/application-list.service';
import { SpinnerComponent } from '../layout/spinner/spinner.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  userName: string = '';
  readonly EMPLOYEE_ROLE = EMPLOYEE_ROLE;
  userRole: EMPLOYEE_ROLE = EMPLOYEE_ROLE.APPLICANT;
  numberOfApplications: number = 0;
  environment = environment;
  loading: boolean = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private applicationListService: ApplicationListService,
  ) {}

  redirectToLeaseApplicationForm() {
    this.router.navigate([ROUTES.NEW_APPLICATION]);
  }

  redirectToLeaseList() {
    this.router.navigate([ROUTES.APPLICATIONS]);
  }

  ngOnInit(): void {
    const loginResponse = localStorage.getItem('loginResponse');
    if (loginResponse) {
      const { userId, role } = JSON.parse(loginResponse);
      this.userService.getUser(userId).subscribe((user: User) => {
        this.userName = user.name;
        this.userRole = role as EMPLOYEE_ROLE;

        if (
          this.userRole === EMPLOYEE_ROLE.REVIEWER ||
          this.userRole === EMPLOYEE_ROLE.APPROVER
        ) {
          this.applicationListService
            .getApplications()
            .subscribe((applications) => {
              this.numberOfApplications = applications.length;
              this.loading = false;
            });
        }
        this.loading = false;
      });
    }
  }
}
