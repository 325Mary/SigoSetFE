import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CentroFormacionService } from './services/centro-formacion/centro-formacion.service'
import { ROUTES, SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from './shared/shared.module';
import { ListaCentrosFormacionComponent } from 'app/views/centro-formacion/lista-centros-formacion/lista-centros-formacion.component';
import { RegistrarCentroFormacionComponent } from 'app/views/centro-formacion/registrar-centro-formacion/registrar-centro-formacion.component';
import { DetalleCentroFormacionComponent } from 'app/views/centro-formacion/detalle-centro-formacion/detalle-centro-formacion.component'
import { LoginService } from './services/usuario/login.service'
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { JwtModule } from '@auth0/angular-jwt';
import { ListarPerfilesComponent } from './views/Perfiles/listar-perfiles/listar-perfiles.component';
import { EditarPerfilComponent } from './views/modals/editar-perfil/editar-perfil.component';
import { CrearPerfilComponent } from './views/modals/crear-perfil/crear-perfil.component';
import { CrearEmpresaComponent } from './views/Empresa/crear-empresa/crear-empresa.component';
import { ListarEmpresaComponent } from './views/Empresa/listar-empresa/listar-empresa.component';
import { EditarEmpresaComponent } from './views/modals/editar-empresa/editar-empresa.component';
import { VerEmpresaComponent } from './views/modals/ver-empresa/ver-empresa.component';
import { NavbarComponent } from "../app/components/navbar/navbar.component";
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { FooterComponent } from './components/footer/footer.component';
import { ListPuestosVigComponent } from './views/puestos-vig/list-puestos-vig/list-puestos-vig.component';
import {PuestosVigilanciaComponent} from './views/puestos-vig/crear-puestos-vig/puestosVig.component'
import { CrearRegionalComponent } from './views/Regionales/crear-regional/crear-regional.component';
import { AdministrarRegionalComponent } from './views/Regionales/administrar-regional/administrar-regional.component';
import { CrearModulosComponent } from './views/modulos/crear-modulos/crear-modulos.component';
import { ListaModuloComponent } from './views/modulos/lista-modulos/lista-modulos.component';
import { CrearUsersComponent} from './views/Usuario/crear-users/crear-users.component'
import {EditUserComponent} from './views/Usuario/edit-user/edit-user.component'
import { CambiarPasswordComponent } from './views/Usuario/cambiar-password/cambiar-password.component';
import {ListUsersComponent} from './views/Usuario/list-users/list-users.component'
import {LoginComponent} from './views/Usuario/login/login.component'
import {PersonalizacionComponent} from './views/Usuario/personalizacion/personalizacion.component'
import {RestablecerPasswordComponent} from './views/Usuario/restablecer-password/restablecer-password.component'
import {ListarContratosComponent} from './views/contrato/listar-contratos/listar-contratos.component';
import { CrearContratoComponent } from './views/modals/crear-contrato/crear-contrato.component'
import {VerUserComponent} from './views/modals/ver-user/ver-user.component';
import {EditarContratoComponent} from './views/modals/editar-contrato/editar-contrato.component';
import { AdministrarCentroComponent } from './views/administrarServicios/administrar-centro/administrar-centro.component';
import { SesionCaucadaComponent } from './views/Usuario/sesion-caucada/sesion-caucada.component';
import {AuthInterceptor} from './services/usuario/auth.interceptor';
import { DataSource } from '@angular/cdk/collections';
import { CrearPuestoComponent } from './views/modals/crear-puesto/crear-puesto.component';
import { PuestoVxCentroComponent } from './views/modals/Puestos/puesto-vx-centro/puesto-vx-centro.component';
import { CommonModule } from '@angular/common';
import { AsignarPuestosVComponent } from './views/administrarServicios/asignar-puestos-v/asignar-puestos-v.component';
@NgModule({
  imports: [
     AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    SharedModule,
    MatTableModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    }),

  ],

  declarations: [
    AsignarPuestosVComponent,
    AppComponent,
    PuestoVxCentroComponent,
    CrearUsersComponent,
    AdminLayoutComponent,
    SidebarComponent,
    ListaCentrosFormacionComponent,
    FooterComponent,
    RegistrarCentroFormacionComponent,
    DetalleCentroFormacionComponent,
    ListPuestosVigComponent,
    ListarPerfilesComponent,
    EditarPerfilComponent,
    CrearPerfilComponent,
    CrearEmpresaComponent,
    ListarEmpresaComponent,
    EditarEmpresaComponent,
    PuestosVigilanciaComponent,
    ListaModuloComponent,
    CrearModulosComponent,
    ListaModuloComponent,
    VerEmpresaComponent,
    PuestosVigilanciaComponent,
    CrearRegionalComponent,
    AdministrarRegionalComponent,
    EditUserComponent,
    CambiarPasswordComponent,
    ListUsersComponent,
    LoginComponent,
    PersonalizacionComponent,
    RestablecerPasswordComponent,
    CrearContratoComponent,
    CrearModulosComponent,
    PuestosVigilanciaComponent,
    NavbarComponent,
    VerUserComponent,
    ListarContratosComponent,
    EditarContratoComponent,
    CrearContratoComponent,
    CrearContratoComponent,
    AdministrarCentroComponent,
    SesionCaucadaComponent,
    CrearPuestoComponent,    

  ],
  providers: [
    LoginService,
    CentroFormacionService
    , JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }  ],
  bootstrap: [AppComponent]
}) 
export class AppModule { }
