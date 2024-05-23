import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarZonaComponent } from './administrar-zona.component';

describe('AdministrarZonaComponent', () => {
  let component: AdministrarZonaComponent;
  let fixture: ComponentFixture<AdministrarZonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarZonaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrarZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
