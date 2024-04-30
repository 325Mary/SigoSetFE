import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuestosVigComponent } from './puestosVig.component';

describe('PuestosVigComponent', () => {
  let component: PuestosVigComponent;
  let fixture: ComponentFixture<PuestosVigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuestosVigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuestosVigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
