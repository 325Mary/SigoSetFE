import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarObligacionComponent } from './editar-obligacion.component';

describe('EditarObligacionComponent', () => {
  let component: EditarObligacionComponent;
  let fixture: ComponentFixture<EditarObligacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarObligacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarObligacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
