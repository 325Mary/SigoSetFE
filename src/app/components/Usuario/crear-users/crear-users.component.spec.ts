import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearUsersComponent } from './crear-users.component';

describe('CrearUsersComponent', () => {
  let component: CrearUsersComponent;
  let fixture: ComponentFixture<CrearUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
