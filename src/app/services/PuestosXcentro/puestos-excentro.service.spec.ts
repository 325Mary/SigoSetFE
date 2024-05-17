import { TestBed } from '@angular/core/testing';

import { PuestosEXcentroService } from './puestos-excentro.service';

describe('PuestosEXcentroService', () => {
  let service: PuestosEXcentroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuestosEXcentroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
