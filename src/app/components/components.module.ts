import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from '../views/Usuario/login/login.component';
import { RestablecerPasswordComponent } from '../views/Usuario/restablecer-password/restablecer-password.component';
import { CambiarPasswordComponent } from '../views/Usuario/cambiar-password/cambiar-password.component';
// import { ComponenteComponent } from './componente/componente.component';
import { PersonalizacionComponent } from '../views/Usuario/personalizacion/personalizacion.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListUsersComponent } from '../views/Usuario/list-users/list-users.component';
import {CrearUsersComponent} from '../views/Usuario/crear-users/crear-users.component';
import { EditUserComponent } from '../views/Usuario/edit-user/edit-user.component'
// import { HomeComponent } from './home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { RegionalComponent } from './regional/regional.component';
import { PuestosVigilanciaComponent } from './puestos-vig/crear-puestos-vig/puestosVig.component';
import { ListPuestosVigComponent } from './puestos-vig/list-puestos-vig/list-puestos-vig.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [
    FooterComponent,
    LoginComponent,
    RestablecerPasswordComponent,
    CambiarPasswordComponent,
    PersonalizacionComponent,
    NotFoundComponent,
    CrearUsersComponent,
    ListUsersComponent,
    EditUserComponent,
    RegionalComponent,
    PuestosVigilanciaComponent,
    // ListPuestosVigComponent,
  ],
  exports: [
    FooterComponent,
    LoginComponent
  ]
})
export class ComponentsModule { }
