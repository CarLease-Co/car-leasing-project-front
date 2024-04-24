import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LocalStorageManagerService } from '../services/local-storage-manager.service';
import { EMPLOYEE_ROLE } from '../enums';

export const sysAdminLoginGuard: CanActivateFn = () => {
  const localStorageService = inject(LocalStorageManagerService);

  return (
    localStorageService.getStoredUser()?.role === EMPLOYEE_ROLE.SYSTEM_ADMIN
  );
};
