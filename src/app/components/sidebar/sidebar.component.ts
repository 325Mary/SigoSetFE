// import { ListPuestosVigComponent } from './../list-puestos-vig/list-puestos-vig.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {LoginService} from '../../services/usuario/login.service'
import { Router, NavigationStart } from '@angular/router';
import { TokenValidationService } from '../../services/VertificacionUser/token-validation.service';
import { Subscription } from 'rxjs';

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
  isLoggedIn = false;
  userData: any;
  loginStatusSubscription!: Subscription;
  isSuperAdministrador = false;
  isOrdenadorG = false;
  currentRoute = '';


  constructor( private loginService: LoginService,
     private router: Router,
     private tokenValidationService: TokenValidationService,
     private authService: LoginService,
     private cdr: ChangeDetectorRef) { 
      this.router.events.subscribe((val) => {
        this.currentRoute = this.router.url;
      });
     }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);


    this.checkAuthentication();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.currentRoute = this.router.url;
        this.checkAuthentication();
        
      }
    });
    this.loginStatusSubscription = this.authService.loginStatusChanged.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
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
  
  
  async checkAuthentication() {
    try {
      const token = localStorage.getItem('token');
      if (token && await this.tokenValidationService.isValidToken(token)) {
        this.isLoggedIn = true;
        this.userData = await this.tokenValidationService.getUserData(token);
        this.setUserRoles(this.userData.idperfil);
        console.log('isLogin:', this.userData)
        this.cdr.detectChanges(); // Realizar detección de cambios
      }
    } catch (error) {
      console.error('Error al verificar la autenticación:', error);
    }
  }
  setUserRoles(idperfil: Number) {
    if (idperfil) {
      this.isSuperAdministrador = idperfil === 1;
      this.isOrdenadorG = idperfil === 2;
    }
  }
  
}
