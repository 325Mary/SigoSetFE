import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearObligacionComponent } from './crear-obligacion.component';

describe('CrearObligacionComponent', () => {
  let component: CrearObligacionComponent;
  let fixture: ComponentFixture<CrearObligacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearObligacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearObligacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
