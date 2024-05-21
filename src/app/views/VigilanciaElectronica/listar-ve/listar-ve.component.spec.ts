import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVEComponent } from './listar-ve.component';

describe('ListarVEComponent', () => {
  let component: ListarVEComponent;
  let fixture: ComponentFixture<ListarVEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarVEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarVEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
