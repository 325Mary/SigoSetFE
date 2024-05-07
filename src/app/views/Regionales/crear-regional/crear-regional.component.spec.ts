import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRegionalComponent } from './crear-regional.component';

describe('CrearRegionalComponent', () => {
  let component: CrearRegionalComponent;
  let fixture: ComponentFixture<CrearRegionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearRegionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
