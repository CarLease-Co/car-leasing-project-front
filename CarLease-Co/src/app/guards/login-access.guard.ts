import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ROUTES } from '../enums';
import { LocalStorageManagerService } from '../services/local-storage-manager.service';

export const loginAccessGuard: CanActivateFn = () => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageManagerService);

  // eslint-disable-next-line no-extra-boolean-cast
  if (!!localStorageService.getStoredUser()) {
    return true;
  } else {
    router.navigate([ROUTES.LOGIN]);
    return false;
  }
};
