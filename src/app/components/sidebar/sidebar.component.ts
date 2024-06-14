import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModulosXperfilService } from "../../services/modulos/modulos-xperfil.service";
import { LoginService } from '../../services/usuario/login.service';
import { TokenValidationService } from '../../services/VertificacionUser/token-validation.service';

declare const $: any;

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
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
  moduloXperfil: any[] = [];
  moduleRoutes: { module: string, routes: any[] }[] = [];
  collapsedModules: Set<string> = new Set();

  constructor(
    private loginService: LoginService,
    private router: Router,
    private tokenValidationService: TokenValidationService,
    private authService: LoginService,
    private modulosXperfilService: ModulosXperfilService,
    private cdr: ChangeDetectorRef
  ) {
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
    return $(window).width() <= 991;
  };

  async checkAuthentication() {
    try {
      const token = localStorage.getItem('token');
      if (token && await this.tokenValidationService.isValidToken(token)) {
        this.isLoggedIn = true;
        this.userData = await this.tokenValidationService.getUserData(token);
        this.setUserRoles(this.userData.idperfil);
        this.obtenerModulosPorPerfil(this.userData.idperfil);
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

  obtenerModulosPorPerfil(idperfil: number) {
    this.modulosXperfilService.obtenerModulosPorPerfil(idperfil).subscribe(
      response => {
        const groupedModules = response.data.reduce((acc, curr) => {
          if (!acc[curr.modulo]) {
            acc[curr.modulo] = [];
          }
  
          // Verificar duplicados de url_modulo
          if (!acc[curr.modulo].some(route => route.url_modulo === curr.url_modulo)) {
            acc[curr.modulo].push(curr);
          }
  
          return acc;
        }, {});
  
        // Filtrar módulos para incluir solo aquellos con rutas que tienen permiso 'si'
        this.moduleRoutes = Object.keys(groupedModules).map(module => ({
          module,
          routes: groupedModules[module].filter(route => route.permiso === 'si')
        })).filter(moduleRoute => moduleRoute.routes.length > 0);
      },
      error => {
        console.error('Error al obtener los módulos por perfil:', error);
      }
    );
  }
  

  toggleCollapse(module: string) {
    if (this.collapsedModules.has(module)) {
      this.collapsedModules.delete(module);
    } else {
      this.collapsedModules.add(module);
    }
  }

  isCollapsed(module: string): boolean {
    return this.collapsedModules.has(module);
  }
}
