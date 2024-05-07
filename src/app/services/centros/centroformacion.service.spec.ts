import { TestBed } from '@angular/core/testing';

import { CentroformacionService } from './centroformacion.service';

describe('CentroformacionService', () => {
  let service: CentroformacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentroformacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
