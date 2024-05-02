import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {  LoginService} from "./services/usuario/login.service";
import  {CentroFormacionService} from  './services/centro-formacion/centro-formacion.service'
import {SidebarComponent} from './components/sidebar/sidebar.component';
import { SharedModule } from './shared/shared.module'; 
import { ListaCentrosFormacionComponent } from 'app/views/centro-formacion/lista-centros-formacion/lista-centros-formacion.component';
import { RegistrarCentroFormacionComponent } from 'app/views/centro-formacion/registrar-centro-formacion/registrar-centro-formacion.component';
import { DetalleCentroFormacionComponent } from 'app/views/centro-formacion/detalle-centro-formacion/detalle-centro-formacion.component'

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
   
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SidebarComponent,
    ListaCentrosFormacionComponent,
    RegistrarCentroFormacionComponent,
  DetalleCentroFormacionComponent

  ],
  providers: [
    LoginService, 
    CentroFormacionService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
