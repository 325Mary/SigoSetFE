import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './Usuario/login/login.component';
import { RestablecerPasswordComponent } from './Usuario/restablecer-password/restablecer-password.component';
import { CambiarPasswordComponent } from './Usuario/cambiar-password/cambiar-password.component';
import { ComponenteComponent } from './componente/componente.component';
import { PersonalizacionComponent } from './Usuario/personalizacion/personalizacion.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListUsersComponent } from './Usuario/list-users/list-users.component';
import {CrearUsersComponent} from './Usuario/crear-users/crear-users.component';
import { EditUserComponent } from './Usuario/edit-user/edit-user.component'
import { NgxPaginationModule } from 'ngx-pagination';


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
    NavbarComponent,
    LoginComponent,
    RestablecerPasswordComponent,
    CambiarPasswordComponent,
    ComponenteComponent,
    PersonalizacionComponent,
    NotFoundComponent,
    CrearUsersComponent,
    ListUsersComponent,
    EditUserComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    ComponenteComponent,
    LoginComponent
  ]
})
export class ComponentsModule { }
