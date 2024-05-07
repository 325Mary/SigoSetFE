import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPerfilesComponent } from './listar-perfiles.component';

describe('ListarPerfilesComponent', () => {
  let component: ListarPerfilesComponent;
  let fixture: ComponentFixture<ListarPerfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPerfilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
