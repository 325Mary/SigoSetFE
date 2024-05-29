import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMunicipiosComponent } from './ver-municipios.component';

describe('VerMunicipiosComponent', () => {
  let component: VerMunicipiosComponent;
  let fixture: ComponentFixture<VerMunicipiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerMunicipiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerMunicipiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
