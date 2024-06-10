import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarObligacionesContratoComponent } from './editar-obligaciones-contrato.component';

describe('EditarObligacionesContratoComponent', () => {
  let component: EditarObligacionesContratoComponent;
  let fixture: ComponentFixture<EditarObligacionesContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarObligacionesContratoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarObligacionesContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
