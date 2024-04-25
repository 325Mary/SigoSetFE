import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RestablecerPasswordComponent } from './restablecer-password/restablecer-password.component';
import { CambiarPasswordComponent } from './Usuario/cambiar-password/cambiar-password.component';
import { ComponenteComponent } from './componente/componente.component';
import { PersonalizacionComponent } from './Usuario/personalizacion/personalizacion.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    RestablecerPasswordComponent,
    CambiarPasswordComponent,
    ComponenteComponent,
    PersonalizacionComponent,
    NotFoundComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    ComponenteComponent,
    LoginComponent
  ]
})
export class ComponentsModule { }
