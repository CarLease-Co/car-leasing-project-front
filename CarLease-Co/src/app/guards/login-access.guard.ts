import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const loginAccessGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginService = inject(LoginService);
  const loginResponse = loginService.loginResponse$;

  if (loginResponse) {
    console.log('loginResponse', loginResponse);
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
