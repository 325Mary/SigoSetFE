import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPuestosXcCentroComponent } from './list-puestos-xc-centro.component';

describe('ListPuestosXcCentroComponent', () => {
  let component: ListPuestosXcCentroComponent;
  let fixture: ComponentFixture<ListPuestosXcCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPuestosXcCentroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPuestosXcCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
