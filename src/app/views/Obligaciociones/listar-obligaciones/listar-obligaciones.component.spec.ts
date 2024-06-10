import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarObligacionesComponent } from './listar-obligaciones.component';

describe('ListarObligacionesComponent', () => {
  let component: ListarObligacionesComponent;
  let fixture: ComponentFixture<ListarObligacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarObligacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarObligacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
