import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPuestosVigComponent } from '../list-puestos-vig/list-puestos-vig.component';

describe('PuestosVigComponent', () => {
  let component: ListPuestosVigComponent;
  let fixture: ComponentFixture<ListPuestosVigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPuestosVigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPuestosVigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
