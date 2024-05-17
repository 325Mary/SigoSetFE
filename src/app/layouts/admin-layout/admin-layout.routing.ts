import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import {LoginComponent} from '../../views/Usuario/login/login.component'
import {RestablecerPasswordComponent} from '../../views/Usuario/restablecer-password/restablecer-password.component'
import { CambiarPasswordComponent } from "../../views/Usuario/cambiar-password/cambiar-password.component";
import {PersonalizacionComponent} from '../../views/Usuario/personalizacion/personalizacion.component';
import {NotFoundComponent} from '../../components/not-found/not-found.component'


import { CrearUsersComponent} from "../../views//Usuario/crear-users/crear-users.component";
import { ListUsersComponent } from "../../views/Usuario/list-users/list-users.component";
import {EditUserComponent} from "../../views/Usuario/edit-user/edit-user.component";

import {CrearPerfilComponent} from  '../../views/modals/crear-perfil/crear-perfil.component'
import {ListarPerfilesComponent} from '../../views/Perfiles/listar-perfiles/listar-perfiles.component';

import {ListarEmpresaComponent} from '../../views/Empresa/listar-empresa/listar-empresa.component';
import {CrearEmpresaComponent} from '../../views/Empresa/crear-empresa/crear-empresa.component'

import { CrearRegionalComponent } from 'app/views/Regionales/crear-regional/crear-regional.component';
import { AdministrarRegionalComponent } from 'app/views/Regionales/administrar-regional/administrar-regional.component';

import { PuestosVigilanciaComponent } from 'app/views/puestos-vig/crear-puestos-vig/puestosVig.component';
import { ListPuestosVigComponent } from 'app/views/puestos-vig/list-puestos-vig/list-puestos-vig.component';

import { HomeComponent } from 'app/views/ladding/home.component';

import { ListaCentrosFormacionComponent } from 'app/views/centro-formacion/lista-centros-formacion/lista-centros-formacion.component';
import { RegistrarCentroFormacionComponent } from 'app/views/centro-formacion/registrar-centro-formacion/registrar-centro-formacion.component';
import { DetalleCentroFormacionComponent } from 'app/views/centro-formacion/detalle-centro-formacion/detalle-centro-formacion.component'

import { CrearModulosComponent } from 'app/views/modulos/crear-modulos/crear-modulos.component';

import { Component } from '@angular/core';

//import { RegionalComponent } from 'app/components/regional/regional.component';
import { ListaModuloComponent } from 'app/views/modulos/lista-modulos/lista-modulos.component'; 
import {ListarContratosComponent} from 'app/views/contrato/listar-contratos/listar-contratos.component';
import {AdministrarCentroComponent} from 'app/views/administrarServicios/administrar-centro/administrar-centro.component'
import {SesionCaucadaComponent} from 'app/views/Usuario/sesion-caucada/sesion-caucada.component'
import {AsignarPuestosVComponent} from 'app/views/administrarServicios/asignar-puestos-v/asignar-puestos-v.component'
export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    {path:'',component :HomeComponent},
    { path: 'user-profile',   component: UserProfileComponent },

    {path:'list-regional',component:AdministrarRegionalComponent},
    {path:'create-regional',component:CrearRegionalComponent},
  
    { path: 'login', component: LoginComponent},
    { path: 'restablecerPassword', component: RestablecerPasswordComponent},
    { path: 'cambiarPassword/:userId', component:CambiarPasswordComponent},
    { path: 'perfil', component: PersonalizacionComponent},
    { path: 'crearUsuario', component: CrearUsersComponent},
    { path: 'listarUsuarios', component: ListUsersComponent},
    { path: 'editarUsuario/:userId', component: EditUserComponent},
    { path: 'crearPerfil', component: CrearPerfilComponent},
    { path: 'AdministrarPerfiles', component: ListarPerfilesComponent},
    { path: 'ListEmpresas', component: ListarEmpresaComponent},
    { path: 'crearEmpresa', component: CrearEmpresaComponent},

    {path:'PuestosVigilancia',component:PuestosVigilanciaComponent},
    {path:'listarPuestosVig',component:ListPuestosVigComponent},
    { path: 'cambiarPassword', component:CambiarPasswordComponent},

    { path: 'listaCentroFormacion', component:ListaCentrosFormacionComponent},
    { path: 'registrarCentroFormacion', component:RegistrarCentroFormacionComponent},
    { path: 'editarCentroFormacion/:id', component:RegistrarCentroFormacionComponent},
    { path: 'detalleCentroFormacion/:id', component:DetalleCentroFormacionComponent},
    { path: 'listContratos', component: ListarContratosComponent},
    { path: 'AdministrarCentros', component: AdministrarCentroComponent},
    { path: 'sesionCaducada', component: SesionCaucadaComponent},
    { path: 'asignarpuestosPorCentro/:idcentro_formacion', component: AsignarPuestosVComponent},
      { path: '**', component: NotFoundComponent},// dejar SIEMPRE de ultima

];
