import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSedesXcentroComponent } from './list-sedes-xcentro.component';

describe('ListSedesXcentroComponent', () => {
  let component: ListSedesXcentroComponent;
  let fixture: ComponentFixture<ListSedesXcentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSedesXcentroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSedesXcentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
