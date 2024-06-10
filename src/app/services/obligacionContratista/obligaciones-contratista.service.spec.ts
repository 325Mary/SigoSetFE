import { TestBed } from '@angular/core/testing';

import { ObligacionesContratistaService } from './obligaciones-contratista.service';

describe('ObligacionesContratistaService', () => {
  let service: ObligacionesContratistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObligacionesContratistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
