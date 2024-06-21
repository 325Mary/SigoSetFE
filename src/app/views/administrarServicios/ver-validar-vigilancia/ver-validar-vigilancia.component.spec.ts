import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerValidarVigilanciaComponent } from './ver-validar-vigilancia.component';

describe('VerValidarVigilanciaComponent', () => {
  let component: VerValidarVigilanciaComponent;
  let fixture: ComponentFixture<VerValidarVigilanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerValidarVigilanciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerValidarVigilanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
