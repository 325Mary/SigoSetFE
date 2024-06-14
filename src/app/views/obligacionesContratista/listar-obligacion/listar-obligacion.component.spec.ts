import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarObligacionComponent } from './listar-obligacion.component';

describe('ListarObligacionComponent', () => {
  let component: ListarObligacionComponent;
  let fixture: ComponentFixture<ListarObligacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarObligacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarObligacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
