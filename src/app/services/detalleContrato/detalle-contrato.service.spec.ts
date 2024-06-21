import { TestBed } from '@angular/core/testing';

import { DetalleContratoService } from './detalle-contrato.service';

describe('DetalleContratoService', () => {
  let service: DetalleContratoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleContratoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
