import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCentroFormacionComponent } from './registrar-centro-formacion.component';

describe('RegistrarCentroFormacionComponent', () => {
  let component: RegistrarCentroFormacionComponent;
  let fixture: ComponentFixture<RegistrarCentroFormacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarCentroFormacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarCentroFormacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
