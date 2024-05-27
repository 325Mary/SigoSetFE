import { TestBed } from '@angular/core/testing';

import { ModuloService } from './modulos.service';

describe('ModulosService', () => {
  let service: ModuloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
