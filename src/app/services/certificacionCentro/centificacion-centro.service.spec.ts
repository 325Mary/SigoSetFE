import { TestBed } from '@angular/core/testing';

import { CentificacionCentroService } from './centificacion-centro.service';

describe('CentificacionCentroService', () => {
  let service: CentificacionCentroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentificacionCentroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
