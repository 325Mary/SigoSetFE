import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerObligacionesContratoComponent } from './ver-obligaciones-contrato.component';

describe('VerObligacionesContratoComponent', () => {
  let component: VerObligacionesContratoComponent;
  let fixture: ComponentFixture<VerObligacionesContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerObligacionesContratoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerObligacionesContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
