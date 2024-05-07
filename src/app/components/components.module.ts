import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from '../views/Usuario/login/login.component';
import { RestablecerPasswordComponent } from '../views/Usuario/restablecer-password/restablecer-password.component';
import { CambiarPasswordComponent } from '../views/Usuario/cambiar-password/cambiar-password.component';
import {AdministrarRegionalComponent} from '../../app/views/Regionales/administrar-regional/administrar-regional.component'
import {CrearRegionalComponent} from '../views/Regionales/crear-regional/crear-regional.component'
import { PersonalizacionComponent } from '../views/Usuario/personalizacion/personalizacion.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListUsersComponent } from '../views/Usuario/list-users/list-users.component';
import {CrearUsersComponent} from '../views/Usuario/crear-users/crear-users.component';
import { EditUserComponent } from '../views/Usuario/edit-user/edit-user.component'
// import { NgxPaginationModule } from 'ngx-pagination';

import { PuestosVigilanciaComponent } from '../../app/views/puestos-vig/crear-puestos-vig/puestosVig.component';
import { ListPuestosVigComponent } from '../../app/views/puestos-vig/list-puestos-vig/list-puestos-vig.component';

import { CrearModulosComponent } from 'app/views/modulos/crear-modulos/crear-modulos.component';
import { ListaModuloComponent } from 'app/views/modulos/lista-modulos/lista-modulos.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,

    //NgxPaginationModule
  ],
  declarations: [
    FooterComponent,
    LoginComponent,
    RestablecerPasswordComponent,
    CambiarPasswordComponent,
    CrearRegionalComponent,
    AdministrarRegionalComponent,
    PersonalizacionComponent,
    ListUsersComponent,
    CrearUsersComponent,
    EditUserComponent,
    CrearModulosComponent,
    ListaModuloComponent,
    
  ],
  exports: [
    FooterComponent,
    LoginComponent,
    CrearRegionalComponent,
    AdministrarRegionalComponent,
    CrearModulosComponent,
    ListaModuloComponent,
    
  ]
})
export class ComponentsModule { }
