import { TestBed } from '@angular/core/testing';

import { ModulosXperfilService } from './modulos-xperfil.service';

describe('ModulosXperfilService', () => {
  let service: ModulosXperfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModulosXperfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
