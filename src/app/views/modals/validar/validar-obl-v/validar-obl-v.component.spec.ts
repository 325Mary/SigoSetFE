import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarOblVComponent } from './validar-obl-v.component';

describe('ValidarOblVComponent', () => {
  let component: ValidarOblVComponent;
  let fixture: ComponentFixture<ValidarOblVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidarOblVComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidarOblVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
