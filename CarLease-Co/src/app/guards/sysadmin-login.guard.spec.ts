import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { sysAdminLoginGuard } from './sysadmin-login.guard';

describe('sysadminLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => sysAdminLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
