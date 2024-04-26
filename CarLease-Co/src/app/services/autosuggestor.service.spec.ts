import { TestBed } from '@angular/core/testing';

import { AutosuggestorService } from './autosuggestor.service';

describe('AutosuggestorService', () => {
  let service: AutosuggestorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutosuggestorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
