import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { sysadminLoginGuard } from './sysadmin-login.guard';

describe('sysadminLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => sysadminLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
