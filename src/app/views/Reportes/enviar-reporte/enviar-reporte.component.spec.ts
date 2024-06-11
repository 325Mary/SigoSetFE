import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarReporteComponent } from './enviar-reporte.component';

describe('EnviarReporteComponent', () => {
  let component: EnviarReporteComponent;
  let fixture: ComponentFixture<EnviarReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviarReporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviarReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
