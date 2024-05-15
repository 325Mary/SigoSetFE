import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/usuario/login.service'
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  ];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor( private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  // cerrarSesion() {
  //   // Realizar la solicitud de cierre de sesión sin pasar ningún argumento
  //   this.loginService.cerrarSesion().subscribe(
  //     response => {
  //       this.loginService.removerToken();
  //       this.router.navigate(['/']);
  //       history.replaceState(null, '', '/');
  //     },
  //     error => {
  //       // Manejar errores (por ejemplo, mostrar un mensaje de error)
  //       console.error('Error al cerrar sesión:', error);
  //     }
  //   );
  // }
  
  
}
