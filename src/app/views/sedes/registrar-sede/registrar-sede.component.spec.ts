import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarSedeComponent } from './registrar-sede.component';

describe('RegistrarSedeComponent', () => {
  let component: RegistrarSedeComponent;
  let fixture: ComponentFixture<RegistrarSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarSedeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
