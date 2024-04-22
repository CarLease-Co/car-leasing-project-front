import { CanActivateFn } from '@angular/router';

export const busadminLoginGuard: CanActivateFn = () => {
  const loginResponse = localStorage.getItem('loginResponse');
  let role: string = '';
  if (loginResponse) {
    role = JSON.parse(loginResponse).role;
  }
  if (role === 'BUSINESS_ADMIN') {
    return true;
  } else {
    return false;
  }
};
