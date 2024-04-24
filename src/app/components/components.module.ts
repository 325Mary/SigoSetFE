import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { RestablecerPasswordComponent } from './restablecer-password/restablecer-password.component';
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';
import { ComponenteComponent } from './componente/componente.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RestablecerPasswordComponent,
    CambiarPasswordComponent,
    ComponenteComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ComponenteComponent
  ]
})
export class ComponentsModule { }
