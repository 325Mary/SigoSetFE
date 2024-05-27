import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPuestoComponent } from './crear-puesto.component';

describe('CrearPuestoComponent', () => {
  let component: CrearPuestoComponent;
  let fixture: ComponentFixture<CrearPuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPuestoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
