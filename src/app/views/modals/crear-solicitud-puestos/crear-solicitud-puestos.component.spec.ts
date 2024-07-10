import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSolicitudPuestosComponent } from './crear-solicitud-puestos.component';

describe('CrearSolicitudPuestosComponent', () => {
  let component: CrearSolicitudPuestosComponent;
  let fixture: ComponentFixture<CrearSolicitudPuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearSolicitudPuestosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearSolicitudPuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
