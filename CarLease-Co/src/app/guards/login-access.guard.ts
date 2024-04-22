import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginAccessGuard: CanActivateFn = () => {
  const router = inject(Router);
  const loginResponse = localStorage.getItem('loginResponse');
  if (loginResponse) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
