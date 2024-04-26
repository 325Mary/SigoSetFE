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
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,

  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
