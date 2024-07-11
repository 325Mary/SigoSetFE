import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerObliContratistaComponent } from './ver-obli-contratista.component';

describe('VerObliContratistaComponent', () => {
  let component: VerObliContratistaComponent;
  let fixture: ComponentFixture<VerObliContratistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerObliContratistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerObliContratistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
