import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMunicipiosComponent } from './edit-municipios.component';

describe('EditMunicipiosComponent', () => {
  let component: EditMunicipiosComponent;
  let fixture: ComponentFixture<EditMunicipiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMunicipiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMunicipiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
