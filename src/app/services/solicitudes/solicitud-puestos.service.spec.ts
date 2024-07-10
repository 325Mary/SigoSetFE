import { TestBed } from '@angular/core/testing';

import { SolicitudPuestosService } from './solicitud-puestos.service';

describe('SolicitudPuestosService', () => {
  let service: SolicitudPuestosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudPuestosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
