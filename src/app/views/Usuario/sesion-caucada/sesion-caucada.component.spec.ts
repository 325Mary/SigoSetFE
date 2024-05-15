import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionCaucadaComponent } from './sesion-caucada.component';

describe('SesionCaucadaComponent', () => {
  let component: SesionCaucadaComponent;
  let fixture: ComponentFixture<SesionCaucadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SesionCaucadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SesionCaucadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
