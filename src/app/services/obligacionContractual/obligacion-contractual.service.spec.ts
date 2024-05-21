import { TestBed } from '@angular/core/testing';

import { ObligacionContractualService } from './obligacion-contractual.service';

describe('ObligacionContractualService', () => {
  let service: ObligacionContractualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObligacionContractualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
