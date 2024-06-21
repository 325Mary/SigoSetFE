import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarObligacionModalComponent } from './editar-obligacion.component';

describe('EditarObligacionComponent', () => {
  let component: EditarObligacionModalComponent;
  let fixture: ComponentFixture<EditarObligacionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarObligacionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarObligacionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
