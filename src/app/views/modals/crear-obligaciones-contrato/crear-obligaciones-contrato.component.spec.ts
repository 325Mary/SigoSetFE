import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearObligacionesContratoComponent } from './crear-obligaciones-contrato.component';

describe('CrearObligacionesContratoComponent', () => {
  let component: CrearObligacionesContratoComponent;
  let fixture: ComponentFixture<CrearObligacionesContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearObligacionesContratoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearObligacionesContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
