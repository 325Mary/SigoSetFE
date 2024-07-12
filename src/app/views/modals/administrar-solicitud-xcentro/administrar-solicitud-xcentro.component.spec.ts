import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarSolicitudXcentroComponent } from './administrar-solicitud-xcentro.component';

describe('AdministrarSolicitudXcentroComponent', () => {
  let component: AdministrarSolicitudXcentroComponent;
  let fixture: ComponentFixture<AdministrarSolicitudXcentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarSolicitudXcentroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrarSolicitudXcentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
