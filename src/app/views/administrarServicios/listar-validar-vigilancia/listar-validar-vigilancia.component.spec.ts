import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarValidarVigilanciaComponent } from './listar-validar-vigilancia.component';

describe('ListarValidarVigilanciaComponent', () => {
  let component: ListarValidarVigilanciaComponent;
  let fixture: ComponentFixture<ListarValidarVigilanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarValidarVigilanciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarValidarVigilanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
