import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { EMPLOYEE_ROLE } from '../enums';
import { LocalStorageManagerService } from '../services/local-storage-manager.service';

export const busAdminLoginGuard: CanActivateFn = () => {
  const localStorageService = inject(LocalStorageManagerService);
  const currentUser = localStorageService.storedUser();

  return currentUser()?.role === EMPLOYEE_ROLE.BUSINESS_ADMIN;
};
