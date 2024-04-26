import { TestBed } from '@angular/core/testing';

import { PuestosVigilanciaService } from './puestosVig.service';

describe('PuestosVigService', () => {
  let service: PuestosVigilanciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuestosVigilanciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
