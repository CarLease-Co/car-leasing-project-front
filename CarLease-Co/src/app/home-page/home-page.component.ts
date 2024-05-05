import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../enums';
import { environment } from '../environment';
import { UserService } from '../services/user.service';
import { User } from '../types';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  userName: string = '';
  userRole: string = '';
  environment = environment;

  constructor(
    private router: Router,
    private userService: UserService,
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
        this.userRole = role;
      });
    }
  }
}
