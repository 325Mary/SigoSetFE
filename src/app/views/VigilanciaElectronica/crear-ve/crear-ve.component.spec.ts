import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearVEComponent } from './crear-ve.component';

describe('CrearVEComponent', () => {
  let component: CrearVEComponent;
  let fixture: ComponentFixture<CrearVEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearVEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearVEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
