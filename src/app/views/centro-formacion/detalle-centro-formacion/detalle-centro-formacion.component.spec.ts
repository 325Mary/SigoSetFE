import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCentroFormacionComponent } from './detalle-centro-formacion.component';

describe('DetalleCentroFormacionComponent', () => {
  let component: DetalleCentroFormacionComponent;
  let fixture: ComponentFixture<DetalleCentroFormacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCentroFormacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCentroFormacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
