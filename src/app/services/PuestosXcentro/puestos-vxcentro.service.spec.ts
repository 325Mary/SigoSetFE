import { TestBed } from '@angular/core/testing';

import { PuestosVXcentroService } from './puestos-vxcentro.service';

describe('PuestosVXcentroService', () => {
  let service: PuestosVXcentroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuestosVXcentroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
