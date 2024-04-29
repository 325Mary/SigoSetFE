import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {LoginComponent} from '../../components/Usuario/login/login.component'
import {RestablecerPasswordComponent} from '../../components/Usuario/restablecer-password/restablecer-password.component'
import {  CambiarPasswordComponent } from "../../components/Usuario/cambiar-password/cambiar-password.component";
import {PersonalizacionComponent} from '../../components/Usuario/personalizacion/personalizacion.component';
import {NotFoundComponent} from '../../components/not-found/not-found.component'
import { CrearUsersComponent} from "../../components/Usuario/crear-users/crear-users.component";
import { ListUsersComponent } from "../../components/Usuario/list-users/list-users.component";
import {EditUserComponent} from "../../components/Usuario/edit-user/edit-user.component";

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
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'restablecerPassword', component: RestablecerPasswordComponent},
    { path: 'cambiarPassword/:userId', component:CambiarPasswordComponent},
    { path: 'perfil', component: PersonalizacionComponent},
    { path: 'crearUsuario', component: CrearUsersComponent},
    { path: 'listarUsuarios', component: ListUsersComponent},
    { path: 'editarUsuario/:userId', component: EditUserComponent},
    { path: '**', component: NotFoundComponent}
];
