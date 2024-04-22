import { CanActivateFn, Router, RouterLink } from '@angular/router';

export const sysadminLoginGuard: CanActivateFn = () => {
  const loginResponse = localStorage.getItem('loginResponse');
  let role: string = '';
  if (loginResponse) {
    role = JSON.parse(loginResponse).role;
  }
  if (role === 'SYSTEM_ADMIN') {
    return true;
  } else {
    return false;
  }
};
