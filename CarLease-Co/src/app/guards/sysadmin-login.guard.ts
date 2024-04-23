import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterLink } from '@angular/router';
import { LocalStorageManagerService } from '../services/local-storage-manager.service';
import { EMPLOYEE_ROLE } from '../enums';

export const sysadminLoginGuard: CanActivateFn = () => {
  const localStorageService = inject(LocalStorageManagerService);

  if (
    localStorageService.getStoredUser()?.role === EMPLOYEE_ROLE.SYSTEM_ADMIN
  ) {
    return true;
  } else {
    return false;
  }
};
