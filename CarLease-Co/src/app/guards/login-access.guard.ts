import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageManagerService } from '../services/local-storage-manager.service';

export const loginAccessGuard: CanActivateFn = () => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageManagerService);

  if (!!localStorageService.getStoredUser()) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
