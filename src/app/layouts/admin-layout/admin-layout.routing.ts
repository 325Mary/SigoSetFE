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
import { EditarModuloComponent } from 'app/views/modulos/editar-modulo/editar-modulo.component';
import { DetalleModuloComponent } from 'app/views/modulos/detalle-modulo/detalle-modulo.component';
import{ListaModuloComponent} from 'app/views/modulos/lista-modulos/lista-modulos.component'

import { Component } from '@angular/core';

//import { RegionalComponent } from 'app/components/regional/regional.component';
import {ListarContratosComponent} from 'app/views/contrato/listar-contratos/listar-contratos.component';
import {AdministrarCentroComponent} from 'app/views/administrarServicios/administrar-centro/administrar-centro.component'
import {SesionCaucadaComponent} from 'app/views/Usuario/sesion-caucada/sesion-caucada.component'
import {AsignarPuestosVComponent} from 'app/views/administrarServicios/asignar-puestos-v/asignar-puestos-v.component'

import { CrearObligacionComponent } from 'app/views/obligacionesContractuales/crear-obligacion/crear-obligacion.component';
import { AdministrarObligacionComponent } from 'app/views/obligacionesContractuales/administrar-obligacion/administrar-obligacion.component';
import { VerObligacionModalComponent } from 'app/views/modals/verObligacionesContractuales/ver-obligacion/ver-obligacion.component'; 
import { EditarObligacionModalComponent } from 'app/views/modals/editarObligacionesContractuales/editar-obligacion/editar-obligacion.component'; 

import { ValidarVigilanciaComponent } from "app/views/administrarServicios/validar-vigilancia/validar-vigilancia.component";
import {  CrearVEComponent} from "app/views/VigilanciaElectronica/crear-ve/crear-ve.component";
import { ListarVEComponent } from "app/views/VigilanciaElectronica/listar-ve/listar-ve.component";

import { CrearContratoComponent } from 'app/views/modals/crear-contrato/crear-contrato.component';
import { AdministrarZonaComponent } from 'app/views/zonas/administrar-zona/administrar-zona.component';
import { CrearZonaComponent } from 'app/views/zonas/crear-zona/crear-zona.component';
import { CrearModulosXperfilComponent } from "app/views/modulos/crear-modulos-xperfil/crear-modulos-xperfil.component";
import { ListarModulosXperfilComponent } from "app/views/modulos/listar-modulos-xperfil/listar-modulos-xperfil.component";
import { ListarObligacionesComponent } from 'app/views/Obligaciociones/listar-obligaciones/listar-obligaciones.component';
import { EnviarReporteComponent } from "app/views/Reportes/enviar-reporte/enviar-reporte.component";
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
  
    {path: 'list-zonas',component:AdministrarZonaComponent},
    {path: 'crear-zonas',component:CrearZonaComponent},


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
    { path: 'crearModulo', component: CrearModulosComponent },
    {path: 'listarModulos', component: ListaModuloComponent},
    {path: 'editarModulo',component: EditarModuloComponent},
    {path: 'detalleModulo',component:DetalleModuloComponent},

    
    {path:'crearObligacionContractual',component:CrearObligacionComponent},
    {path:'administrarObligacionContractual',component:AdministrarObligacionComponent},
    {path:'verObligacionContractual',component:VerObligacionModalComponent},
    {path:'editarObligacionContractual',component:EditarObligacionModalComponent},


    
    {path:'crearObligacionContractual',component:CrearObligacionComponent},
    {path:'administrarObligacionContractual',component:AdministrarObligacionComponent},
    {path:'verObligacionContractual',component:VerObligacionModalComponent},
    {path:'editarObligacionContractual',component:EditarObligacionModalComponent},


    { path: 'validarVigilancia/:idcentro_formacion', component:ValidarVigilanciaComponent},
    { path: 'crearVigilanciaElectronica', component:CrearVEComponent},
    { path: 'listarVigilanciaElectronica', component:ListarVEComponent},
    { path: 'listarModulos', component: ListaModuloComponent},
    { path: 'crearModuloPorPerfil', component: CrearModulosXperfilComponent},
    { path: 'listaModulosPorPerfil', component: ListarModulosXperfilComponent},
    { path: 'listaDeObligacionesPorContrato', component: ListarObligacionesComponent},
    { path: 'reporte', component: EnviarReporteComponent},
      { path: '**', component: NotFoundComponent},// dejar SIEMPRE de ultima

];
