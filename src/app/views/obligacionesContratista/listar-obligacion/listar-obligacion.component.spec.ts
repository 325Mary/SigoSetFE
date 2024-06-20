import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarObligacionContratistaComponent } from './listar-obligacion.component';

describe('ListarObligacionComponent', () => {
  let component: ListarObligacionContratistaComponent;
  let fixture: ComponentFixture<ListarObligacionContratistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarObligacionContratistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarObligacionContratistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
