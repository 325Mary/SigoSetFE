import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCentrosFormacionComponent } from './lista-centros-formacion.component';

describe('ListaCentrosFormacionComponent', () => {
  let component: ListaCentrosFormacionComponent;
  let fixture: ComponentFixture<ListaCentrosFormacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCentrosFormacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCentrosFormacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
