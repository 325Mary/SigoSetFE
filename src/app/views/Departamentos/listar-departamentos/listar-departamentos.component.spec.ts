import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDepartamentosComponent } from './listar-departamentos.component';

describe('ListarDepartamentosComponent', () => {
  let component: ListarDepartamentosComponent;
  let fixture: ComponentFixture<ListarDepartamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarDepartamentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
