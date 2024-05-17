import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuestoVxCentroComponent } from './puesto-vx-centro.component';

describe('PuestoVxCentroComponent', () => {
  let component: PuestoVxCentroComponent;
  let fixture: ComponentFixture<PuestoVxCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuestoVxCentroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuestoVxCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
