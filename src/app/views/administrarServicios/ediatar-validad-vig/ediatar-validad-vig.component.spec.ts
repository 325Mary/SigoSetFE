import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdiatarValidadVigComponent } from './ediatar-validad-vig.component';

describe('EdiatarValidadVigComponent', () => {
  let component: EdiatarValidadVigComponent;
  let fixture: ComponentFixture<EdiatarValidadVigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdiatarValidadVigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdiatarValidadVigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
