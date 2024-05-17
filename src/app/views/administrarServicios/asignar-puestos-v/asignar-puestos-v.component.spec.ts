import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPuestosVComponent } from './asignar-puestos-v.component';

describe('AsignarPuestosVComponent', () => {
  let component: AsignarPuestosVComponent;
  let fixture: ComponentFixture<AsignarPuestosVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarPuestosVComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarPuestosVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
