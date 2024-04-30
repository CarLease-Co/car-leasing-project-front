import { TestBed } from '@angular/core/testing';

import { BusAdminService } from './bus-admin.service';

describe('BusAdminService', () => {
  let service: BusAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
