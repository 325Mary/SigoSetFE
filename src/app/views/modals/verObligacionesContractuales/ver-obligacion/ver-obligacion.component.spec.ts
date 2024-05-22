import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerObligacionComponent } from './ver-obligacion.component';

describe('VerObligacionComponent', () => {
  let component: VerObligacionComponent;
  let fixture: ComponentFixture<VerObligacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerObligacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerObligacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
