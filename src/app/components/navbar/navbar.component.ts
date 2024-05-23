import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { LoginService } from '../../services/usuario/login.service';
import { TokenValidationService } from '../../services/VertificacionUser/token-validation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';
  perfil: string = '';

  constructor(location: Location, private element: ElementRef, private router: Router, private loginService: LoginService, private tokenValidationService: TokenValidationService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart && (event.url === '/login' || event.url === '/')) {
        this.isLoggedIn = false;
        localStorage.setItem('isLoggedIn', JSON.stringify(false));
      }
    });

    this.loginService.loginStatusChanged.subscribe(status => {
      this.isLoggedIn = status;
      localStorage.setItem('isLoggedIn', JSON.stringify(status));
      if (status) {
        this.fetchUsername();
      } else {
        this.username = '';
        this.perfil = ''
      }
    });

    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus) {
      this.isLoggedIn = JSON.parse(storedLoginStatus);
    } else {
      this.isLoggedIn = false;
      localStorage.setItem('isLoggedIn', JSON.stringify(false));
    }

    if (this.isLoggedIn) {
      this.validateToken();
    }
  }

  private validateToken(): void {
    const storedToken = this.tokenValidationService.getToken();

    if (storedToken) {
      const isValidToken = this.tokenValidationService.isValidToken(storedToken);

      if (isValidToken) {
        this.isLoggedIn = true;
        this.fetchUsername();
      } else {
        this.isLoggedIn = false;
        this.router.navigate(['/sesionCaducada']);
      }
    } else {
      this.isLoggedIn = false;
    }
  }

  private fetchUsername(): void {
    const storedToken = this.tokenValidationService.getToken();
    if (storedToken) {
      const userId = this.tokenValidationService.getUserData(storedToken).userId;
      this.loginService.getUserById(userId).subscribe(
        response => {
          if (response && response.user) {
            this.username = response.user.nombre_usuario;
            this.perfil = response.user.perfil
          } else {
            console.error('Faltan datos de usuario en la respuesta');
          }
        },
        error => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    }
  }

  cerrarSesion() {
    this.loginService.cerrarSesion().subscribe(
      response => {
        this.loginService.removerToken();
        this.router.navigate(['/']);
        history.replaceState(null, '', '/');
      },
      error => {
        console.error('Error al cerrar sesión:', error);
      }
    );
  }
}
