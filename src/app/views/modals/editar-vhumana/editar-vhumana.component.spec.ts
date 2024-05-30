import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVHumanaComponent } from './editar-vhumana.component';

describe('EditarVHumanaComponent', () => {
  let component: EditarVHumanaComponent;
  let fixture: ComponentFixture<EditarVHumanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarVHumanaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarVHumanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
