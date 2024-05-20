import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVEComponent } from './editar-ve.component';

describe('EditarVEComponent', () => {
  let component: EditarVEComponent;
  let fixture: ComponentFixture<EditarVEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarVEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarVEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
