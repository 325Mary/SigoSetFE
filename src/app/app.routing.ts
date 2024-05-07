import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from '../app/views/Usuario/login/login.component'
import {RestablecerPasswordComponent} from '../app/views/Usuario/restablecer-password/restablecer-password.component'
import {  CambiarPasswordComponent } from "../app/views/Usuario/cambiar-password/cambiar-password.component";
import {PersonalizacionComponent} from '../app/views/Usuario/personalizacion/personalizacion.component';
import { CrearUsersComponent} from "../app/views/Usuario/crear-users/crear-users.component";
import { ListUsersComponent } from "../app/views/Usuario/list-users/list-users.component";
import {EditUserComponent} from "../app/views/Usuario/edit-user/edit-user.component";


import {CrearPerfilComponent} from './views/modals/crear-perfil/crear-perfil.component'
import {HomeComponent  } from "../app/views/home/home.component";

const routes: Routes =[
  {
    path: '/',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  
  // {
  //   path:'/login',
  //   component:LoginComponent
  // },

  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
    path: '',
    loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  },
  // {
  //   path: '',
  //   component: HomeComponent,
  // }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
