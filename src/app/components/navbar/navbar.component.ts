import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { LoginService } from '../../services/usuario/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit{
    // private listTitles: any[];
    // location: Location;
    //   mobile_menu_visible: any = 0;
    // private toggleButton: any;
    // private sidebarVisible: boolean;
    isLoggedIn: boolean = false;
    username: string = '';
    profile: string = '';
  
  
    constructor(location: Location,  private element: ElementRef, private router: Router,  private loginService: LoginService) {
    //   this.location = location;
    //       this.sidebarVisible = false;
    }
    // ngOnInit(){
    //   this.listTitles = ROUTES.filter(listTitle => listTitle);
    //   const navbar: HTMLElement = this.element.nativeElement;
    //   this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    //   this.router.events.subscribe((event) => {
    //     this.sidebarClose();
    //      var $layer: any = document.getElementsByClassName('close-layer')[0];
    //      if ($layer) {
    //        $layer.remove();
    //        this.mobile_menu_visible = 0;
    //      }
    //  });
    
    // }

    // sidebarOpen() {
    //     const toggleButton = this.toggleButton;
    //     const body = document.getElementsByTagName('body')[0];
    //     setTimeout(function(){
    //         toggleButton.classList.add('toggled');
    //     }, 500);

    //     body.classList.add('nav-open');

    //     this.sidebarVisible = true;
    // };
    // sidebarClose() {
    //     const body = document.getElementsByTagName('body')[0];
    //     this.toggleButton.classList.remove('toggled');
    //     this.sidebarVisible = false;
    //     body.classList.remove('nav-open');
    // };
    // sidebarToggle() {
    //     // const toggleButton = this.toggleButton;
    //     // const body = document.getElementsByTagName('body')[0];
    //     var $toggle = document.getElementsByClassName('navbar-toggler')[0];

    //     if (this.sidebarVisible === false) {
    //         this.sidebarOpen();
    //     } else {
    //         this.sidebarClose();
    //     }
    //     const body = document.getElementsByTagName('body')[0];

    //     if (this.mobile_menu_visible == 1) {
    //         // $('html').removeClass('nav-open');
    //         body.classList.remove('nav-open');
    //         if ($layer) {
    //             $layer.remove();
    //         }
    //         setTimeout(function() {
    //             $toggle.classList.remove('toggled');
    //         }, 400);

    //         this.mobile_menu_visible = 0;
    //     } else {
    //         setTimeout(function() {
    //             $toggle.classList.add('toggled');
    //         }, 430);

    //         var $layer = document.createElement('div');
    //         $layer.setAttribute('class', 'close-layer');


    //         if (body.querySelectorAll('.main-panel')) {
    //             document.getElementsByClassName('main-panel')[0].appendChild($layer);
    //         }else if (body.classList.contains('off-canvas-sidebar')) {
    //             document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
    //         }

    //         setTimeout(function() {
    //             $layer.classList.add('visible');
    //         }, 100);

    //         $layer.onclick = function() { //asign a function
    //           body.classList.remove('nav-open');
    //           this.mobile_menu_visible = 0;
    //           $layer.classList.remove('visible');
    //           setTimeout(function() {
    //               $layer.remove();
    //               $toggle.classList.remove('toggled');
    //           }, 400);
    //         }.bind(this);

    //         body.classList.add('nav-open');
    //         this.mobile_menu_visible = 1;

    //     }
    // };

    // getTitle(){
    //   var titlee = this.location.prepareExternalUrl(this.location.path());
    //   if(titlee.charAt(0) === '#'){
    //       titlee = titlee.slice( 1 );
    //   }

    //   for(var item = 0; item < this.listTitles.length; item++){
    //       if(this.listTitles[item].path === titlee){
    //           return this.listTitles[item].title;
    //       }
    //   }
    //   return 'Dashboard';
    // }

   ngOnInit(): void {
    this.isLoggedIn = false;
    console.log('Initial isLoggedIn value:', this.isLoggedIn);

    // Suscripción a los cambios de autenticación
    this.loginService.loginStatusChanged.subscribe(status => {
      this.isLoggedIn = status;
      localStorage.setItem('isLoggedIn', JSON.stringify(status));
    });
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      // Si hay un token almacenado, establecer isLoggedIn como true
      this.isLoggedIn = true;
      console.log('isLoggedIn set to true:', this.isLoggedIn);
    }
  
    // Manejamos eventos de cambio de ruta para mantener isLoggedIn como false en ciertas condiciones
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart && (event.url === '/login' || event.url === '/')) {
        // Mantenemos isLoggedIn como false si la URL es '/login' o '/'
        this.isLoggedIn = false;
        console.log('isLoggedIn set to false:', this.isLoggedIn);
      }
    });
    this.loginService.loginStatusChanged.subscribe(status => {
        this.isLoggedIn = status;
        if (!status) {
          // Si el usuario cierra sesión, puedes realizar cualquier otra limpieza aquí
          console.log('User logged out.');
        }
      });
      const storedLoginStatus = localStorage.getItem('isLoggedIn');
      if (storedLoginStatus) {
        this.isLoggedIn = JSON.parse(storedLoginStatus);
      } else {
        this.isLoggedIn = false; // Si no hay estado almacenado, establecer como false por defecto
      }
    const userId = this.loginService.getUserId();
    if (userId) {
      this.loginService.getUserById(userId).subscribe(
        user => {
          this.username = user.nombre_usuario;
        },
        error => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    }
    
   }
   cerrarSesion() {
    // Realizar la solicitud de cierre de sesión sin pasar ningún argumento
    this.loginService.cerrarSesion().subscribe(
      response => {
        this.loginService.removerToken();
        this.router.navigate(['/']);
        history.replaceState(null, '', '/');
      },
      error => {
        // Manejar errores (por ejemplo, mostrar un mensaje de error)
        console.error('Error al cerrar sesión:', error);
      }
    );
  }
}

