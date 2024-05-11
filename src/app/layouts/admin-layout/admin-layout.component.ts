import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';
import { filter, Subscription } from 'rxjs';
import { LoginService } from '../../services/usuario/login.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  isLoggedIn: boolean = false;
  elemMainPanel: ElementRef | undefined;
  elemSidebar: ElementRef | undefined;

  constructor(public location: Location, private router: Router, private loginService: LoginService) {}

  ngOnInit() {
    // Siempre inicializamos isLoggedIn como false al inicio
    this.isLoggedIn = false;
    console.log('Initial isLoggedIn value:', this.isLoggedIn);
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      // Si hay un token almacenado, establecer isLoggedIn como true
      this.isLoggedIn = true;
      console.log('isLoggedIn set to true:', this.isLoggedIn);
    }
  
    // Suscripción a los cambios de autenticación
    this.loginService.loginStatusChanged.subscribe(status => {
      this.isLoggedIn = status;
      this.scrollToTopPosition();
      localStorage.setItem('isLoggedIn', JSON.stringify(status));
    });

    // Manejamos eventos de cambio de ruta para mantener isLoggedIn como false en ciertas condiciones
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart && (event.url === '/login' || event.url === '/')) {
        // Mantenemos isLoggedIn como false si la URL es '/login' o '/'
        this.isLoggedIn = false;
        console.log('isLoggedIn set to false:', this.isLoggedIn);
      }
    });
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus) {
      this.isLoggedIn = JSON.parse(storedLoginStatus);
    } else {
      this.isLoggedIn = false; // Si no hay estado almacenado, establecer como false por defecto
    }

    // Otros códigos de inicialización y suscripciones
  }

  scrollToTopPosition() {
    if (this.isLoggedIn && this.elemMainPanel) {
      this.elemMainPanel.nativeElement.scrollTop = 0;
    }

    if (this.elemSidebar && !this.isLoggedIn) {
      this.elemSidebar.nativeElement.scrollTop = 0;
    }
  }

  isMaps(path) {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    return path !== titlee;
  }

  isMac(): boolean {
    return navigator.platform.toUpperCase().includes('MAC') || navigator.platform.toUpperCase().includes('IPAD');
  }

  isHomepage(): boolean {
    return this.location.isCurrentPathEqualTo('/');
  }
}
