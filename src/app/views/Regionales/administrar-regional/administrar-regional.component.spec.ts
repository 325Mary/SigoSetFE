import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarRegionalComponent } from './administrar-regional.component';

describe('AdministrarRegionalComponent', () => {
  let component: AdministrarRegionalComponent;
  let fixture: ComponentFixture<AdministrarRegionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarRegionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrarRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
