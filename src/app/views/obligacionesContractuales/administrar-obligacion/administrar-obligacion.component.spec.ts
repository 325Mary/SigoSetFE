import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarObligacionComponent } from './administrar-obligacion.component';

describe('AdministrarObligacionComponent', () => {
  let component: AdministrarObligacionComponent;
  let fixture: ComponentFixture<AdministrarObligacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarObligacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrarObligacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
