import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CentroFormacionService } from './services/centro-formacion/centro-formacion.service'
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from './shared/shared.module';
import { ListaCentrosFormacionComponent } from 'app/views/centro-formacion/lista-centros-formacion/lista-centros-formacion.component';
import { RegistrarCentroFormacionComponent } from 'app/views/centro-formacion/registrar-centro-formacion/registrar-centro-formacion.component';
import { DetalleCentroFormacionComponent } from 'app/views/centro-formacion/detalle-centro-formacion/detalle-centro-formacion.component'
import { LoginService } from './services/usuario/login.service'
import { JwtHelperService } from '@auth0/angular-jwt';
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
import { ListPuestosVigComponent } from './views/puestos-vig/list-puestos-vig/list-puestos-vig.component';
import { CrearRegionalComponent } from './views/Regionales/crear-regional/crear-regional.component';
import { AdministrarRegionalComponent } from './views/Regionales/administrar-regional/administrar-regional.component';
import  {HomeComponent} from './views/ladding/home.component'
@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    HomeComponent,
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
    AppComponent,
    AdminLayoutComponent,
    SidebarComponent,
    ListaCentrosFormacionComponent,
    RegistrarCentroFormacionComponent,
    DetalleCentroFormacionComponent,
    ListPuestosVigComponent,
    ListarPerfilesComponent,
    EditarPerfilComponent,
    CrearPerfilComponent,
    CrearEmpresaComponent,
    ListarEmpresaComponent,
    EditarEmpresaComponent,

  ],
  providers: [
    LoginService,
    CentroFormacionService

    , JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
