import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { read } from 'fs';
import { LocalStorageManagerService } from '../services/local-storage-manager.service';
import { EMPLOYEE_ROLE } from '../enums';

export const busadminLoginGuard: CanActivateFn = () => {
  const localStorageService = inject(LocalStorageManagerService);

  return (
    localStorageService.getStoredUser()?.role === EMPLOYEE_ROLE.BUSINESS_ADMIN
  );
};
