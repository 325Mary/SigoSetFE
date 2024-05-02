import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './Usuario/login/login.component';
import { RestablecerPasswordComponent } from './Usuario/restablecer-password/restablecer-password.component';
import { CambiarPasswordComponent } from './Usuario/cambiar-password/cambiar-password.component';
import { RegionalComponent } from './regional/regional.component';
import { PuestosVigilanciaComponent } from './puestos-vig/crear-puestos-vig/puestosVig.component';
import { PersonalizacionComponent } from './Usuario/personalizacion/personalizacion.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListUsersComponent } from './Usuario/list-users/list-users.component';
import {CrearUsersComponent} from './Usuario/crear-users/crear-users.component';
import { EditUserComponent } from './Usuario/edit-user/edit-user.component';
import { MatTableModule } from '@angular/material/table';
import { ListaModuloComponent } from 'app/views/modulos/lista-modulos/lista-modulos.component'; 



import { ListPuestosVigComponent } from './puestos-vig/list-puestos-vig/list-puestos-vig.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule
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
    ListPuestosVigComponent,
    ListaModuloComponent,
  ],
  exports: [
    FooterComponent,
    LoginComponent
  ]
})
export class ComponentsModule { }
