import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarObliContratistaComponent } from './editar-obli-contratista.component';

describe('EditarObliContratistaComponent', () => {
  let component: EditarObliContratistaComponent;
  let fixture: ComponentFixture<EditarObliContratistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarObliContratistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarObliContratistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
