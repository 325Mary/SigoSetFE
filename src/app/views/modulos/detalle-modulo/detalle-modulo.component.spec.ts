import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleModuloComponent } from './detalle-modulo.component';

describe('DetalleModuloComponent', () => {
  let component: DetalleModuloComponent;
  let fixture: ComponentFixture<DetalleModuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleModuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
