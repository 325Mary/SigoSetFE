import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarSedePorcentroComponent } from './asignar-sede-porcentro.component';

describe('AsignarSedePorcentroComponent', () => {
  let component: AsignarSedePorcentroComponent;
  let fixture: ComponentFixture<AsignarSedePorcentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarSedePorcentroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarSedePorcentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
