import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMunicipiosComponent } from './list-municipios.component';

describe('ListMunicipiosComponent', () => {
  let component: ListMunicipiosComponent;
  let fixture: ComponentFixture<ListMunicipiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMunicipiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMunicipiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
