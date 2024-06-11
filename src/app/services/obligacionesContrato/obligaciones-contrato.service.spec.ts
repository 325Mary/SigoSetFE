import { TestBed } from '@angular/core/testing';

import { ObligacionesContratoService } from './obligaciones-contrato.service';

describe('ObligacionesContratoService', () => {
  let service: ObligacionesContratoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObligacionesContratoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
