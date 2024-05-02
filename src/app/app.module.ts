import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {LoginService} from './services/usuario/login.service'
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtModule } from '@auth0/angular-jwt';
import { ListarPerfilesComponent } from './views/Perfiles/listar-perfiles/listar-perfiles.component';
import {EditarPerfilComponent} from './views/modals/editar-perfil/editar-perfil.component';
import {CrearPerfilComponent} from './views/modals/crear-perfil/crear-perfil.component'

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
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
    ListarPerfilesComponent,
    EditarPerfilComponent,
    CrearPerfilComponent

  ],
  providers: [LoginService, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
