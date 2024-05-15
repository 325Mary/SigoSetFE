import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarCentroComponent } from './administrar-centro.component';

describe('AdministrarCentroComponent', () => {
  let component: AdministrarCentroComponent;
  let fixture: ComponentFixture<AdministrarCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarCentroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrarCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
