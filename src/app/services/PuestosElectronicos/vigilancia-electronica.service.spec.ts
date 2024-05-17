import { TestBed } from '@angular/core/testing';

import { VigilanciaElectronicaService } from './vigilancia-electronica.service';

describe('VigilanciaElectronicaService', () => {
  let service: VigilanciaElectronicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VigilanciaElectronicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
