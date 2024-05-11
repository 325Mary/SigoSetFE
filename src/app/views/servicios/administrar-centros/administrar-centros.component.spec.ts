import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarCentrosComponent } from './administrar-centros.component';

describe('AdministrarCentrosComponent', () => {
  let component: AdministrarCentrosComponent;
  let fixture: ComponentFixture<AdministrarCentrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarCentrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrarCentrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
