import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarVigilanciaComponent } from './validar-vigilancia.component';

describe('ValidarVigilanciaComponent', () => {
  let component: ValidarVigilanciaComponent;
  let fixture: ComponentFixture<ValidarVigilanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidarVigilanciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidarVigilanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
